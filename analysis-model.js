/* Thin-membrane equilibrium in prescribed, already-inflated ideal geometries.
   Formula reference: https://mechref.engr.illinois.edu/sol/pressure.html */
(function (root) {
  'use strict';
  function calculate(input) {
    const p = Number(input.pressureKPa), r = Number(input.radiusMm), t = Number(input.thicknessMm);
    if (![p, r, t].every(Number.isFinite) || p < 0 || r <= 0 || t <= 0) throw new Error('Enter finite values: pressure ≥ 0, radius > 0, and thickness > 0.');
    if (!['cylinder', 'sphere'].includes(input.shape)) throw new Error('Choose cylinder or sphere.');
    const pressureNmm2 = p / 1000;
    const n1 = pressureNmm2 * r / (input.shape === 'sphere' ? 2 : 1);
    const n2 = pressureNmm2 * r / 2;
    const result = { pressureKPa: p, radiusMm: r, thicknessMm: t, shape: input.shape, n1, n2, stress1MPa: n1 / t, stress2MPa: n2 / t, radiusThickness: r / t, thinWall: r / t >= 10, comparison: null };
    const supplied = v => v !== '' && v !== null && v !== undefined;
    const a = input.fabricStrengthNmm, b = input.seamStrengthNmm;
    if (supplied(a) || supplied(b)) {
      const capacities = [];
      if (supplied(a)) capacities.push({ label: 'fabric strip', value: Number(a) });
      if (supplied(b)) capacities.push({ label: 'seam strip', value: Number(b) });
      const factor = Number(input.factor);
      if (!Number.isFinite(factor) || factor < 1 || capacities.some(c => !Number.isFinite(c.value) || c.value <= 0)) throw new Error('Entered strip strengths must be positive; comparison factor must be at least 1.');
      const governing = capacities.reduce((x, y) => x.value < y.value ? x : y);
      const comparisonLevel = governing.value / factor;
      result.comparison = { label: governing.label, levelNmm: comparisonLevel, demandRatio: Math.max(n1, n2) / comparisonLevel, incomplete: capacities.length < 2, factor };
    }
    return result;
  }
  root.MembraneModel = { calculate };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.MembraneModel;
})(globalThis);
