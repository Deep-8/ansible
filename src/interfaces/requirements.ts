export interface IFilter {
  // sort: string, will use later
  minExperience?: number | null;
  maxExperience?: number | null;
  minBugetInr?: number | null;
  maxBudgetInr?: number | null;
  noOfDevelopers?: number | null;
  durationInMonths?: number | null;
  page: number | undefined;
  skills: string;
  locations: string;
  assignedToIds?: string;
}

export interface addRequirements {
  companyId?: string;
  minExperience?: number;
  maxExperience?: number;
  noOfDevelopers?: number;
  budgetInr?: number;
  locations?: string[];
  durationInMonths?: number;
  skills?: string[];
  status?: boolean | number;
  id?: string;
  assignedTo?: string | null;
}

export interface IAddRequirementProps {
  handleCancel: () => void;
  SetIsfilled: (fill: boolean) => void;
  refetchAllRequirement: () => void;
  initialValues?: addRequirements;
  isEditRequirementModalOpen?: boolean;
  status?: boolean;
}

export interface IrequirementPayload {
  params: {
    include: string;
    profileId?: string;
    companyId?: string;
    // page: number,
    q: string;
  };
}
export interface Iskills {
  createdAt: string;
  id: string;
  name: string;
}
export interface IcompanyName {
  createdAt: string;
  id: string;
  name: string;
}
export interface Ilocation {
  id: string;
  name: string;
  isRemote: 0;
  createdAt: string;
}

export interface Istatus {
  0: "inactive";
  1: "active";
}

export interface ITableCellHeader {
  children: React.ReactNode | undefined;
  status?: number | string;
  colorClass?: string;
}
export interface IMatchScore {
  total: number;
  breakdown: IMatchScoreHover;
}
export interface IMatchScoreHover {
  skill: number;
  location: number;
  experience: number;
  cost: number;
}
