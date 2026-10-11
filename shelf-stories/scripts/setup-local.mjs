import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
function run(args,opts={}){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:20_000_000,...opts});if(r.error)throw r.error;if(r.status!==0){if(r.stdout)console.error(r.stdout);if(r.stderr)console.error(r.stderr);throw new Error('Local setup failed. See the message above.');}return r;}
if(!existsSync('node_modules/vinext/dist/cli.js')){const npm=path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');if(!existsSync(npm))throw new Error('Install dependencies with npm ci, then run this launcher again.');console.log('Installing app dependencies…');run([npm,'ci','--ignore-scripts'],{stdio:'inherit'});}
if(!existsSync('dist/server/wrangler.json'))run(['scripts/run-framework.mjs','build'],{stdio:'inherit'});
const args=['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','dist/server/wrangler.json','--persist-to','.wrangler/state'];
const check=run([...args,'--command',"SELECT count(*) AS total FROM sqlite_master WHERE type='table' AND name='library_state'",'--json']);
let parsed;try{parsed=JSON.parse(check.stdout);}catch{throw new Error('Could not verify local database. '+check.stdout);}
if(!parsed[0]?.results?.[0]?.total){run([...args,'--file','drizzle/0000_sticky_the_stranger.sql'],{stdio:'inherit'});}
console.log('Local library database is ready.');
