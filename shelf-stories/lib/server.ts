import { env } from 'cloudflare:workers';
export function localOnly(request:Request){const host=new URL(request.url).hostname;if(!['localhost','127.0.0.1','[::1]'].includes(host))throw new Error('This prototype is restricted to this computer. Add librarian authentication before online deployment.');if(request.method!=='GET'){const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)throw new Error('Cross-origin changes are not allowed.');}}
export function database(){if(!env.DB)throw new Error('Local library storage is unavailable. Run the setup command in the README.');return env.DB;}
export function bucket(){if(!env.BUCKET)throw new Error('Local photo storage is unavailable.');return env.BUCKET;}
export function failure(error:unknown,status=400){return Response.json({error:error instanceof Error?error.message:'Something went wrong. Please try again.'},{status});}
export function visionConfig(){return {key:env.OPENAI_API_KEY||process.env.OPENAI_API_KEY,model:env.OPENAI_VISION_MODEL||process.env.OPENAI_VISION_MODEL||'gpt-5.4-mini'};}
