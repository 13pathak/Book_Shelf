import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:5173';
async function req(path,options){const r=await fetch(base+path,options);const text=await r.text();let data;try{data=JSON.parse(text);}catch{data={error:text};}return {status:r.status,data};}
const original=await req('/api/library');assert.equal(original.status,200);const snapshot=original.data;await mkdir('work',{recursive:true});await writeFile('work/before-api-check.json',JSON.stringify(snapshot));
const put=(library,revision,origin)=>req('/api/library',{method:'PUT',headers:{'Content-Type':'application/json',...(origin?{Origin:origin}:{})},body:JSON.stringify({library,revision})});
let next=await put(snapshot.library,snapshot.revision);assert.equal(next.status,200);console.log('PASS persistent library save');
const stale=await put(snapshot.library,snapshot.revision);assert.equal(stale.status,409);console.log('PASS stale writes rejected');
const invalid=structuredClone(snapshot.library);invalid.books.push(invalid.books[0]);assert.equal((await put(invalid,next.data.revision)).status,400);console.log('PASS duplicate copies rejected before persistence');
assert([400,403].includes((await put(snapshot.library,next.data.revision,'https://example.com')).status));console.log('PASS cross-origin mutations rejected');
const reloaded=await req('/api/library');assert.equal(reloaded.data.revision,next.data.revision);assert.equal(reloaded.data.library.books.length,snapshot.library.books.length);console.log('PASS reload preserves library and failed writes do not change state');
const cover=await readFile('public/covers/LIB-003.jpg');const form=new FormData();form.append('photo',new File([cover],'test-photo.jpg',{type:'image/jpeg'}));const uploaded=await req('/api/photos',{method:'POST',body:form});assert.equal(uploaded.status,200);const photo=await fetch(base+uploaded.data.url);assert.equal(photo.status,200);assert.deepEqual(Buffer.from(await photo.arrayBuffer()),cover);console.log('PASS photo upload persists bytes and reads back');
const badForm=new FormData();badForm.append('photo',new File(['<svg></svg>'],'bad.svg',{type:'image/svg+xml'}));assert.equal((await req('/api/photos',{method:'POST',body:badForm})).status,400);console.log('PASS unsupported image upload rejected');
if(!snapshot.visionAvailable){const scan=await req('/api/scan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({photo:uploaded.data.url})});assert.equal(scan.status,503);console.log('PASS missing vision key returns actionable message');}
console.log('API integrity checks passed; book data unchanged.');
