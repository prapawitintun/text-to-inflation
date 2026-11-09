/* Loaded after the original pattern editor, sharing its declared model state. */
const studioOrigin=new URL(document.baseURI).origin;
window.addEventListener('message',event=>{
 if(event.source!==parent||event.origin!==studioOrigin||event.data?.type!=='request-pattern-mesh')return;
 try{
  if(!mesh)throw Error('Load a model in Pattern & assembly first.');
  const geometry=scaled();
  parent.postMessage({type:'pattern-mesh',requestId:event.data.requestId,mesh:{v:geometry.v,f:mesh.f.map(f=>f.slice()),name:document.getElementById('filename').textContent,units:'mm',source:'Current Pattern & assembly geometry',size:geometry.size}},studioOrigin);
 }catch(error){parent.postMessage({type:'pattern-mesh-error',requestId:event.data.requestId,error:error.message},studioOrigin)}
});
parent.postMessage({type:'pattern-mesh-ready'},studioOrigin);
