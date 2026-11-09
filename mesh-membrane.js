/* Nonlinear triangular surface membrane: plane-stress St Venant–Kirchhoff
   energy in the supplied reference configuration; pressure potential -p*V.
   Optional relaxed tension-field energy; no bending, anisotropic textile law,
   seam/contact, or resolved wrinkle geometry. */
(function(root){'use strict';
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], sub=(a,b)=>a.map((x,i)=>x-b[i]), dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0), norm=a=>Math.hypot(...a);
function prepare(mesh, fixed, E, nu, thickness, tensionOnly=true){
 if(!mesh||!Array.isArray(mesh.v)||!Array.isArray(mesh.f)||mesh.f.length>6400||mesh.f.length<4)throw Error('Choose a closed triangular mesh with 4–6,400 faces.');
 if(![E,nu,thickness].every(Number.isFinite)||E<=0||nu<0||nu>=.49||thickness<=0)throw Error('Use E > 0, 0 ≤ Poisson ratio < 0.49, and thickness > 0.');
 const vertices=mesh.v.map(v=>{if(!Array.isArray(v)||v.length!==3||v.some(x=>!Number.isFinite(x)))throw Error('Invalid vertex.');return v.slice()}),faces=mesh.f.map(f=>{if(!Array.isArray(f)||f.length!==3||f.some(i=>!Number.isInteger(i)||i<0||i>=vertices.length)||new Set(f).size!==3)throw Error('Invalid triangle.');return f.slice()});
 const edges=new Map(),adj=faces.map(()=>[]);
 faces.forEach((f,i)=>{for(let j=0;j<3;j++){const a=f[j],b=f[(j+1)%3],key=Math.min(a,b)+'_'+Math.max(a,b);if(!edges.has(key))edges.set(key,[]);edges.get(key).push({face:i,dir:a<b?1:-1})}});
 let boundary=0,nonmanifold=0;for(const es of edges.values()){if(es.length===1)boundary++;else if(es.length!==2)nonmanifold++;else{const [a,b]=es;adj[a.face].push([b.face,a.dir===b.dir?-1:1]);adj[b.face].push([a.face,a.dir===b.dir?-1:1])}}
 if(boundary||nonmanifold)throw Error(`Pressure study requires a closed manifold: ${boundary} boundary edges, ${nonmanifold} non-manifold edges. Repair the mesh first.`);
 const signs=new Int8Array(faces.length),components=[];
 for(let seed=0;seed<faces.length;seed++)if(!signs[seed]){const list=[seed];signs[seed]=1;for(let k=0;k<list.length;k++)for(const [j,s]of adj[list[k]]){const expected=signs[list[k]]*s;if(!signs[j]){signs[j]=expected;list.push(j)}else if(signs[j]!==expected)throw Error('Mesh is not consistently orientable.')}components.push(list)}
 const center=[0,1,2].map(j=>vertices.reduce((s,v)=>s+v[j],0)/vertices.length);const X=new Float64Array(vertices.flatMap(v=>v.map((x,j)=>x-center[j])));
 for(let i=0;i<faces.length;i++)if(signs[i]<0)[faces[i][1],faces[i][2]]=[faces[i][2],faces[i][1]];
 for(const list of components){let vol=0;for(const i of list){const [a,b,c]=faces[i].map(j=>Array.from(X.slice(j*3,j*3+3)));vol+=dot(a,cross(b,c))/6}if(Math.abs(vol)<1e-8)throw Error('A mesh component has zero enclosed volume.');if(vol<0)for(const i of list)[faces[i][1],faces[i][2]]=[faces[i][2],faces[i][1]];}
 const pins=new Set(fixed);if([...pins].some(i=>!Number.isInteger(i)||i<0||i>=vertices.length))throw Error('Invalid support vertex.');
 for(const list of components){const ids=new Set(list.flatMap(i=>faces[i]));const support=[...ids].filter(i=>pins.has(i));if(support.length<3)throw Error('Each disconnected component needs at least three non-collinear fixed vertices.');const a=vertices[support[0]];let usable=false;for(let j=1;j<support.length-1&&!usable;j++)for(let k=j+1;k<support.length;k++)if(norm(cross(sub(vertices[support[j]],a),sub(vertices[support[k]],a)))>1e-8){usable=true;break}if(!usable)throw Error('Support vertices are collinear; add a support patch.');}
 const free=new Uint8Array(X.length);free.fill(1);for(const i of pins)for(let j=0;j<3;j++)free[3*i+j]=0;
 const lambda=E*nu/(1-nu*nu),mu=E/(2*(1+nu)),elements=[],diag=new Float64Array(X.length);let area=0,volume=0;
 for(let fi=0;fi<faces.length;fi++){
  const ids=faces[fi],a=vertices[ids[0]],b=vertices[ids[1]],c=vertices[ids[2]],ab=sub(b,a),ac=sub(c,a),L=norm(ab),A=norm(cross(ab,ac))/2;
  if(L<1e-9||A<1e-9)throw Error('Degenerate triangle '+fi+'.');const e1=ab.map(v=>v/L),xx=dot(ac,e1),yy=2*A/L,gx=[-1/L,1/L,0],gy=[(xx/L-1)/yy,-xx/(L*yy),1/yy];
  elements.push({ids,gx,gy,A});area+=A;const [aa,bb,cc]=ids.map(i=>Array.from(X.slice(i*3,i*3+3)));volume+=dot(aa,cross(bb,cc))/6;
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)diag[ids[i]*3+j]+=A*thickness*(lambda+2*mu)*(gx[i]*gx[i]+gy[i]*gy[i]);
 }
 return {X,faces,elements,free,pins:[...pins],lambda,mu,E,nu,tensionOnly,thickness,diag,area,volume,center,components:components.length};
}
function evaluate(model,x,p, wantResults=false){
 const g=new Float64Array(x.length),{elements,lambda,mu,thickness}=model;let energy=0,volume=0;const results=[];
 for(let fi=0;fi<elements.length;fi++){
  const {ids,gx,gy,A}=elements[fi];let f1x=0,f1y=0,f1z=0,f2x=0,f2y=0,f2z=0;
  for(let i=0;i<3;i++){const k=3*ids[i];f1x+=x[k]*gx[i];f1y+=x[k+1]*gx[i];f1z+=x[k+2]*gx[i];f2x+=x[k]*gy[i];f2y+=x[k+1]*gy[i];f2z+=x[k+2]*gy[i]}
  const c11=f1x*f1x+f1y*f1y+f1z*f1z,c22=f2x*f2x+f2y*f2y+f2z*f2z,c12=f1x*f2x+f1y*f2y+f1z*f2z,ex=(c11-1)/2,ey=(c22-1)/2,exy=c12/2,tr=ex+ey;
  let sx=lambda*tr+2*mu*ex,sy=lambda*tr+2*mu*ey,ss=2*mu*exy,density=mu*(ex*ex+ey*ey+2*exy*exy)+lambda*.5*tr*tr,relaxed=false;
  const erad0=Math.hypot((ex-ey)/2,exy),e1=tr/2+erad0,e2=tr/2-erad0;
  if(model.tensionOnly&&e1<=0){sx=sy=ss=density=0;relaxed=true;}
  else if(model.tensionOnly&&e2 < -model.nu*e1){const S1=model.E*e1,a=erad0>1e-15?(ex-ey)/(4*erad0):0,b=erad0>1e-15?exy/(2*erad0):0;sx=S1*(.5+a);sy=S1*(.5-a);ss=S1*b;density=model.E*.5*e1*e1;relaxed=true;}
  energy+=A*thickness*density;
  const p1=[f1x*sx+f2x*ss,f1y*sx+f2y*ss,f1z*sx+f2z*ss],p2=[f2x*sy+f1x*ss,f2y*sy+f1y*ss,f2z*sy+f1z*ss];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)g[ids[i]*3+j]+=A*thickness*(p1[j]*gx[i]+p2[j]*gy[i]);
  const [a,b,c]=ids.map(i=>[x[3*i],x[3*i+1],x[3*i+2]]),bc=cross(b,c),ca=cross(c,a),ab=cross(a,b);volume+=dot(a,bc)/6;
  for(let j=0;j<3;j++){g[3*ids[0]+j]-=p*bc[j]/6;g[3*ids[1]+j]-=p*ca[j]/6;g[3*ids[2]+j]-=p*ab[j]/6;}
  if(wantResults){
   const J=Math.sqrt(Math.max(0,c11*c22-c12*c12));if(J<1e-8)throw Error('An element collapsed. Reduce the load.');
   // Trace and product of the two nonzero eigenvalues of F*S*F^T.
   const trace=sx*c11+sy*c22+2*ss*c12,det=(sx*sy-ss*ss)*(c11*c22-c12*c12),delta=Math.sqrt(Math.max(0,trace*trace-4*det));
   const n1=thickness/J*(trace+delta)/2,n2=thickness/J*(trace-delta)/2;
   const etr=(ex+ey)/2,erad=Math.hypot((ex-ey)/2,exy);results.push({face:fi,n1,n2,greenMax:etr+erad,greenMin:etr-erad,J,relaxed});
  }
 }
 energy-=p*volume;
 return {energy,g,volume,results};
}
function solve(model,options={},progress){
 const pressure=options.pressureKPa/1000;if(!Number.isFinite(pressure)||pressure<0)throw Error('Pressure must be finite and non-negative.');
 const tol=options.tolerance||1e-4,maxIter=options.maxIterations||2500,steps=pressure===0?1:(options.steps||4),free=model.free,x=model.X.slice();let iterations=0,converged=true,last,relativeResidual=0;
 for(let step=1;step<=steps;step++){
  const p=pressure*step/steps,load=evaluate(model,model.X,p).g,loadNorm=Math.sqrt(load.reduce((s,v,i)=>s+(free[i]?v*v:0),0));let history=[],ev=evaluate(model,x,p),gnorm;
  for(let it=0;it<maxIter;it++){
   const g=ev.g.slice();let gg=0;for(let i=0;i<g.length;i++){if(!free[i])g[i]=0;gg+=g[i]*g[i]}gnorm=Math.sqrt(gg);relativeResidual=gnorm/Math.max(loadNorm,1e-10);
   if(relativeResidual<tol||gnorm<1e-9)break;
   let q=g.slice(),alphas=[];
   for(let k=history.length-1;k>=0;k--){const h=history[k],a=h.rho*dot(q,h.s);alphas[k]=a;for(let i=0;i<q.length;i++)q[i]-=a*h.y[i]}
   let scale=1;if(history.length){const last=history[history.length-1];let den=0;for(let i=0;i<q.length;i++)den+=last.y[i]*last.y[i]/Math.max(model.diag[i],1e-12);scale=Math.max(1e-4,Math.min(1e6,1/(last.rho*Math.max(den,1e-30))));}const r=new Float64Array(q.length);for(let i=0;i<q.length;i++)r[i]=scale*q[i]/Math.max(model.diag[i],1e-12);
   for(let k=0;k<history.length;k++){const h=history[k],b=h.rho*dot(h.y,r),a=alphas[k];for(let i=0;i<r.length;i++)r[i]+=h.s[i]*(a-b)}
   let gd=-dot(g,r);if(!Number.isFinite(gd)||gd>=0){history=[];for(let i=0;i<r.length;i++)r[i]=g[i]/Math.max(model.diag[i],1e-12);gd=-dot(g,r)}
   let alpha=1,next,trial;for(let search=0;search<32;search++){trial=x.map((v,i)=>free[i]?v-alpha*r[i]:v);next=evaluate(model,trial,p);if(Number.isFinite(next.energy)&&next.energy<=ev.energy+1e-4*alpha*gd+1e-10)break;alpha*=.5;next=null;}
   if(!next){converged=false;break;}
   const s=trial.map((v,i)=>v-x[i]),y=next.g.map((v,i)=>free[i]?v-ev.g[i]:0),ys=dot(y,s);
   if(ys>1e-12*Math.sqrt(dot(y,y)*dot(s,s))){history.push({s,y,rho:1/ys});if(history.length>12)history.shift()}
   x.set(trial);ev=next;iterations++;
   if(it%50===0&&progress)progress({step,steps,iterations,residual:relativeResidual});
   if(it===maxIter-1)converged=false;
  }
  last=ev;if(!converged)break;
 }
 const final=evaluate(model,x,pressure,true),g=final.g;let sq=0;const baseLoad=evaluate(model,model.X,pressure).g;let loadsq=0;
 for(let i=0;i<g.length;i++)if(free[i]){sq+=g[i]*g[i];loadsq+=baseLoad[i]*baseLoad[i]}relativeResidual=Math.sqrt(sq)/Math.max(Math.sqrt(loadsq),1e-10);converged=converged&&(relativeResidual<tol||Math.sqrt(sq)<1e-8);
 const displacement=Array.from({length:x.length/3},(_,i)=>Math.hypot(x[i*3]-model.X[i*3],x[i*3+1]-model.X[i*3+1],x[i*3+2]-model.X[i*3+2]));
 const deformed=Array.from({length:x.length/3},(_,i)=>[0,1,2].map(j=>x[3*i+j]+model.center[j]));const reaction=[0,0,0];for(const i of model.pins)for(let j=0;j<3;j++)reaction[j]+=g[3*i+j];
 return {converged,relativeResidual,iterations,displacement,deformed,faces:model.faces,results:final.results,pressureKPa:options.pressureKPa,volume:final.volume,referenceVolume:model.volume,referenceArea:model.area,reaction,fixed:model.pins,components:model.components};
}
root.MeshMembrane={prepare,evaluate,solve};if(typeof module!=='undefined'&&module.exports)module.exports=root.MeshMembrane;
})(globalThis);
