import {spawnSync} from 'node:child_process';
import path from 'node:path';
process.chdir(path.resolve(import.meta.dirname,'..'));
try{const r=await fetch('http://127.0.0.1:5173/api/library',{signal:AbortSignal.timeout(2000)});if(r.ok){console.log('Shelf & Story is already running: http://127.0.0.1:5173/');process.exit(0);}}catch{}
const result=spawnSync(process.execPath,['scripts/setup-local.mjs'],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);
process.argv=[process.execPath,'scripts/run-framework.mjs','dev'];await import('./run-framework.mjs');
