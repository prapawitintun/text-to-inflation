(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const ids = ['shape', 'pressure', 'radius', 'thickness', 'fabric', 'seam', 'factor'];
  const format = n => n === 0 ? '0' : Math.abs(n) < 0.001 || Math.abs(n) >= 100000 ? n.toExponential(3) : Number(n.toPrecision(4)).toLocaleString('en-US', { maximumFractionDigits: 7 });
  function input() { return { shape: $('shape').value, pressureKPa: $('pressure').value, radiusMm: $('radius').value, thicknessMm: $('thickness').value, fabricStrengthNmm: $('fabric').value, seamStrengthNmm: $('seam').value, factor: $('factor').value }; }
  const lerp = (a, b, v) => a + (b - a) * v;
  function color(value, max) {
    const stops = [[36, 120, 187], [31, 165, 154], [246, 199, 108], [196, 73, 55]], t = Math.min(1, Math.max(0, value / max)) * 3, i = Math.min(2, Math.floor(t));
    return 'rgb(' + stops[i].map((a, j) => Math.round(lerp(a, stops[i + 1][j], t - i))).join(',') + ')';
  }
  function drawShape(result, colorMax) {
    const isSphere = result.shape === 'sphere', fill = color(Math.max(result.stress1MPa, result.stress2MPa), colorMax);
    const project = ([x, y, z]) => { const u = .86 * x - .51 * y, v = .51 * x + .86 * y; return [360 + u * 105, 160 - z * 105 + v * 25, v]; };
    const point = (u, v) => isSphere ? [Math.cos(u) * Math.cos(v), Math.sin(u) * Math.cos(v), Math.sin(v)] : [1.55 * v, Math.cos(u), Math.sin(u)];
    const cells = [], rings = 24, bands = 12;
    for (let i = 0; i < rings; i++) for (let j = 0; j < bands; j++) {
      const a = i / rings * Math.PI * 2, b = (i + 1) / rings * Math.PI * 2;
      const lo = isSphere ? -Math.PI / 2 + j / bands * Math.PI : -1 + j / bands * 2;
      const hi = isSphere ? -Math.PI / 2 + (j + 1) / bands * Math.PI : -1 + (j + 1) / bands * 2;
      const ps = [point(a, lo), point(b, lo), point(b, hi), point(a, hi)].map(project);
      cells.push({ ps, d: ps.reduce((s, p) => s + p[2], 0) });
    }
    cells.sort((a, b) => b.d - a.d);
    let svg = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#193e3d"/></marker></defs>';
    svg += cells.map(c => '<polygon points="' + c.ps.map(p => p.slice(0, 2).join(',')).join(' ') + '" fill="' + fill + '" stroke="#183f43" stroke-opacity=".35" stroke-width=".6"/>').join('');
    svg += '<text x="20" y="28" font-family="system-ui" font-size="13" fill="#193e3d">' + (isSphere ? 'Ideal sphere · equal biaxial tension' : 'Ideal closed cylinder · hoop + axial tension') + '</text>';
    svg += '<path d="M555 105L610 75 M555 160L620 160 M555 215L610 245" fill="none" stroke="#193e3d" stroke-width="1.5" marker-end="url(#arrow)"/><text x="565" y="282" font-family="system-ui" font-size="12">Internal pressure</text>';
    svg += '<text x="20" y="314" font-family="system-ui" font-size="12" fill="#193e3d">Uniform analytical color · ' + format(Math.max(result.stress1MPa, result.stress2MPa)) + ' MPa · illustration not to scale</text>';
    $('shapeView').innerHTML = svg;
    $('shapeView').setAttribute('aria-label', 'Ideal ' + result.shape + ', uniform larger membrane stress ' + format(Math.max(result.stress1MPa, result.stress2MPa)) + ' megapascals. No local stress distribution is calculated.');
  }
  function drawChart(r) {
    const maxP = Math.max(5, r.pressureKPa * 2), peak = maxP / 1000 * r.radiusMm / (r.shape === 'sphere' ? 2 : 1);
    const comp = r.comparison ? r.comparison.levelNmm : null;
    const maxN = Math.max(peak * 1.15, comp !== null ? comp * 1.15 : 0, .001), X = p => 70 + 610 * p / maxP, Y = n => 220 - 170 * n / maxN;
    let svg = '<g font-family="system-ui" font-size="12" fill="#345a50">';
    for (let i = 0; i <= 4; i++) { const y = 220 - i * 170 / 4; svg += '<path d="M70 ' + y + 'H680" stroke="#dce5de"/><text x="60" y="' + (y + 4) + '" text-anchor="end">' + format(maxN * i / 4) + '</text><text x="' + X(maxP * i / 4) + '" y="241" text-anchor="middle">' + format(maxP * i / 4) + '</text>'; }
    svg += '<text x="70" y="24">Membrane force · N/mm</text><text x="375" y="270" text-anchor="middle">Gauge pressure · kPa</text><path d="M70 50V220H680" fill="none" stroke="#839c8d"/>';
    svg += '<path d="M70 220L680 ' + Y(peak) + '" fill="none" stroke="#087b70" stroke-width="3"/>';
    if (comp !== null) svg += '<path d="M70 ' + Y(comp) + 'H680" stroke="#ad6f26" stroke-width="1.5" stroke-dasharray="5 5"/><text x="677" y="' + (Y(comp) - 6) + '" text-anchor="end" fill="#87551c">Entered comparison level</text>';
    svg += '<circle cx="' + X(r.pressureKPa) + '" cy="' + Y(Math.max(r.n1, r.n2)) + '" r="5" fill="#193e3d"/></g>';
    $('chart').innerHTML = svg;
  }
  function render() {
    try {
      const r = MembraneModel.calculate(input()), scale = Number($('colorMax').value);
      if (!Number.isFinite(scale) || scale <= 0) throw new Error('Color scale maximum must be positive.');
      $('error').textContent = ''; $('results').style.opacity = '1';
      $('forceLabel').textContent = r.shape === 'sphere' ? 'Force per unit width · either direction' : 'Hoop force per unit width';
      $('stressLabel').textContent = r.shape === 'sphere' ? 'Membrane stress · either direction' : 'Hoop membrane stress';
      $('force').textContent = format(r.n1) + ' N/mm'; $('stress').textContent = format(r.stress1MPa) + ' MPa';
      $('directionRows').innerHTML = '<tr><td>' + (r.shape === 'sphere' ? 'Meridional' : 'Hoop') + '</td><td>' + format(r.n1) + '</td><td>' + format(r.stress1MPa) + '</td></tr><tr><td>' + (r.shape === 'sphere' ? 'Circumferential' : 'Axial') + '</td><td>' + format(r.n2) + '</td><td>' + format(r.stress2MPa) + '</td></tr>';
      $('assumption').textContent = 'Radius / thickness = ' + format(r.radiusThickness) + '. ' + (r.thinWall ? 'Passes the tool’s r/t ≥ 10 thin-wall screen; all other model assumptions still apply.' : 'Outside the r/t ≥ 10 thin-wall screen. These equations are not an appropriate stress approximation for this input.');
      $('assumption').style.color = r.thinWall ? '#45685b' : '#9c3c24';
      const box = $('comparison'); box.replaceChildren();
      if (!r.comparison) { box.textContent = 'Enter measured fabric and seam strip strengths to show a comparison level. No capacity assessment is available.'; }
      else {
        const c = r.comparison;
        box.textContent = (r.thinWall ? '' : 'Thin-wall screen failed; comparison is outside the model assumptions. ') + (c.incomplete ? 'Partial comparison: only one strip strength supplied. ' : '') + 'Demand / entered comparison level = ' + format(c.demandRatio) + '. Governing entered value: ' + c.label + ', divided by factor ' + format(c.factor) + ', gives ' + format(c.levelNmm) + ' N/mm. ' + (c.demandRatio > 1 ? 'Demand exceeds that level. ' : 'Demand is at or below that level. ') + 'This does not establish the capacity of the finished structure.';
      }
      drawShape(r, scale); drawChart(r);
    } catch (err) {
      $('error').textContent = err.message;
      $('force').textContent = '—'; $('stress').textContent = '—'; $('directionRows').replaceChildren();
      $('assumption').textContent = 'Inputs are invalid; previous calculations are cleared.'; $('comparison').textContent = 'No comparison available.';
      $('shapeView').replaceChildren(); $('chart').replaceChildren();
    }
  }
  $('inputs').addEventListener('submit', e => e.preventDefault());
  ids.forEach(id => $(id).addEventListener('input', render)); $('colorMax').addEventListener('input', render);
  $('reset').addEventListener('click', () => { $('inputs').reset(); $('colorMax').value = '1'; render(); });
  render();
})();
