

export interface ISkillsPayload {
    params: {
        include?: string,
        page?: number,
        paginate?:boolean
        q?:string,
        companyName?:string
    }
}

export interface Iskills{
 createdAt?:string,
id?:string,
name: string
}