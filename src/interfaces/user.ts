export interface IUserPayload {
  params: {
    q?: string;
    paginate?: boolean;
    status?: number;
  };
}

export interface Iuser {
  createdAt?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: number;
}
