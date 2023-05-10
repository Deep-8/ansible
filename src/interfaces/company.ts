export interface IContacts {
  contactPerson: string;
  email: string;
  mobile: string;
}
export interface ICompanyTable {
  id: string;
  name: string;
  createdAt: Date;
  contacts: IContacts[];
}
export interface IPayloadAddCompany {
  name: string;
  contacts: IContacts[];
  locations?: string;
  skills?: string;
}
export interface ICompanyRequirementsCommon {
  id: string;
  name: string;
  createdAt: Date;
  isRemote?: number;
}
export interface ICompanyRequirements {
  id: string;
  minExperience: number;
  maxExperience: number;
  noOfDevelopers: number;
  budgetInr: number;
  durationInMonths: number;
  status: number;
  notes: null;
  createdAt: Date;
  locations: ICompanyRequirementsCommon[];
  skills: ICompanyRequirementsCommon[];
  company: ICompanyRequirementsCommon;
}

export interface ICompanyId {
  queryKey: string[];
}
export interface ICompany {
  name: string;
  person: string;
  email: string;
  mobile: string;
}

interface params {
  include?: string;
  page?: Number;
  paginate?: boolean;
  q?: string;
}
export interface IgetAllCompaniesPayload {
  params: params;
}
