import { z } from 'zod';
export const boxSchema=z.object({x:z.number().min(0).max(100),y:z.number().min(0).max(100),w:z.number().positive().max(100),h:z.number().positive().max(100)}).refine(b=>b.x+b.w<=100.1&&b.y+b.h<=100.1,'Book outline must stay inside the photo');
export const bookSchema=z.object({id:z.string().trim().min(1).max(80),title:z.string().trim().min(1).max(250),author:z.string().max(200),genre:z.string().max(80),age:z.string().max(40),summary:z.string().max(6000),color:z.string().regex(/^#[0-9a-fA-F]{6}$/),isbn:z.string().max(20),shelfId:z.string().min(1),position:z.number().int().min(1).max(5000),status:z.enum(['available','issued','unknown']),dueDate:z.string().optional().refine(v=>!v||(/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v),"Use a valid YYYY-MM-DD expected return date"),box:boxSchema.optional(),source:z.string().max(1000).optional(),origin:z.enum(['erp','manual','photo']).optional(),erpSource:z.string().max(250).optional(),publisher:z.string().max(250).optional(),language:z.string().max(100).optional(),year:z.string().max(20).optional(),price:z.string().max(40).optional(),pages:z.string().max(30).optional()});
export const shelfSchema=z.object({id:z.string(),name:z.string().trim().min(1).max(100),location:z.string().max(200),photo:z.string().regex(/^\/api\/photos\/[a-zA-Z0-9-]+$/).optional()});
export const librarySchema=z.object({books:z.array(bookSchema).max(5000),shelves:z.array(shelfSchema).max(100),history:z.array(z.object({id:z.string(),name:z.string(),date:z.string(),count:z.number(),kind:z.enum(['erp','circulation']).optional()})).max(100),updatedAt:z.string()}).superRefine((s,ctx)=>{if(new Set(s.books.map(b=>b.id.toLowerCase())).size!==s.books.length)ctx.addIssue({code:'custom',message:'Every copy needs a unique book ID'});if(new Set(s.shelves.map(x=>x.id)).size!==s.shelves.length)ctx.addIssue({code:'custom',message:'Shelf IDs must be unique'});if(s.books.some(b=>!s.shelves.some(x=>x.id===b.shelfId)))ctx.addIssue({code:'custom',message:'Every book must belong to a shelf'});});
export type Book=z.infer<typeof bookSchema>;export type Shelf=z.infer<typeof shelfSchema>;export type Library=z.infer<typeof librarySchema>;
export const genres=['All books','Adventure','Fantasy','Mystery','Nature & science','Classics','Poetry'];
export function emptyBook(shelfId:string):Book{return {id:`LIB-${Date.now().toString().slice(-7)}`,title:'',author:'',genre:'Adventure',age:'',summary:'',color:'#376764',isbn:'',shelfId,position:1,status:'available'};}
export function parseCSV(text:string,delimiter=','):string[][] {
 const rows:string[][]=[];let row:string[]=[],cell='',quoted=false,closed=false;
 const source=text.replace(/^\uFEFF/,'');
 for(let i=0;i<source.length;i++){const c=source[i];
  if(quoted){if(c==='"'){if(source[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;continue;}
  if(c===delimiter){row.push(cell.trim());cell='';closed=false;}
  else if(c==='\n'||c==='\r'){if(c==='\r'&&source[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';closed=false;}
  else if(c==='"'){if(cell.trim()||closed)throw new Error('Unexpected quote in CSV. Export it again from your ERP.');quoted=true;cell='';}
  else if(closed){if(c!==' '&&c!=='\t')throw new Error('Unexpected text after a quoted CSV value.');}
  else cell+=c;
 }
 if(quoted)throw new Error('A quoted value is missing its closing quote.');row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows;
}
export type Change={row:number,bookId:string,title:string,status:'available'|'issued',dueDate:string};
export function circulationPreview(rows:string[][],books:Book[],mapping:{id:number,action:number,due:number}){const changes:Change[]=[];const errors:string[]=[];const seen=new Set<string>();rows.slice(1).forEach((r,i)=>{const id=(r[mapping.id]||'').trim();const b=books.find(x=>x.id.toLowerCase()===id.toLowerCase());const action=(r[mapping.action]||'').trim().toLowerCase();const status=['issue','issued','checkout','checked out','borrowed'].includes(action)?'issued':['return','returned','available','checkin','checked in'].includes(action)?'available':null;const due=(r[mapping.due]||'').trim();if(!b){errors.push(`Row ${i+2}: unknown book ID “${id||'(empty)'}”.`);return;}if(seen.has(b.id)){errors.push(`Row ${i+2}: “${id}” appears twice. Use one final status per book.`);return;}seen.add(b.id);if(!status){errors.push(`Row ${i+2}: use Issue or Return as the action.`);return;}if(status==='issued'&&due&&(!/^\d{4}-\d{2}-\d{2}$/.test(due)||Number.isNaN(Date.parse(due))||new Date(due).toISOString().slice(0,10)!==due)){errors.push(`Row ${i+2}: due date must be a real date in YYYY-MM-DD format.`);return;}changes.push({row:i+2,bookId:b.id,title:b.title,status,dueDate:status==='issued'?due:''});});return {changes,errors};}
export function guessMapping(headers:string[]){const h=headers.map(x=>x.toLowerCase().replace(/[^a-z]/g,''));return {id:h.findIndex(x=>['bookid','accession','accessionnumber','accessionno','copyid','id'].includes(x)),action:h.findIndex(x=>['action','status','transaction','transactiontype'].includes(x)),due:h.findIndex(x=>['duedate','due','returndue'].includes(x))};}


export function statusLabel(status:Book['status']){return status==='available'?'Available to borrow':status==='issued'?'Out on an adventure':'Check with librarian';}


export function orderBooks(books:Book[],shelves:Shelf[]){const rank=new Map(shelves.map((s,i)=>[s.id,i]));return [...books].sort((a,b)=>(rank.get(a.shelfId)??999)-(rank.get(b.shelfId)??999)||a.position-b.position||a.id.localeCompare(b.id,undefined,{numeric:true}));}
