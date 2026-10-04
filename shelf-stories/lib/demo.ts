import type { Library,Book } from './library';
import books from './demo-books.json';
export const demo:Library={shelves:[{id:'shelf-1',name:'The story corner',location:'Cupboard A · Top shelf'},{id:'shelf-2',name:'Curious minds',location:'Cupboard A · Middle shelf'},{id:'shelf-3',name:'One more chapter',location:'Cupboard A · Bottom shelf'}],books:books.map(b=>({...b,source:'Editorial demo summary'})) as Book[],history:[],updatedAt:''};
