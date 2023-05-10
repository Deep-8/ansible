export interface IUserPayload {
  params: {
    q?: string;
    paginate?: boolean;
  };
}

export interface Iuser{
createdAt?:string,
id?:string,
name?: string,
email?:string
role?:number
 }
