export interface ILocationPayload {
  params: {
    include?: string;
    page?: number;
    paginate?: boolean;
    q?: string;
    sort?: string;
  };
}

export interface ILocation{
  createdAt?:string,
 id?:string,
 name: string
 }