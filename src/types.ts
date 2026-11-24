export type ImageAsset = {url?:string;alt?:string};
export type Manga = {id?:string;slug:string;title:string;cover?:ImageAsset|null;latest_chapter?:string|null;updated_at?:string|null;type?:string|null;rating?:number;status?:string;href?:string};
export type Chapter = {id?:string;slug?:string;title:string;chapter_number?:number|string|null;released_at?:string|null;href?:string|null};
export type User = {id:string;username:string;display_name:string;email?:string;bio?:string|null;avatar?:{url?:string};joined_at?:string;is_public?:boolean};
