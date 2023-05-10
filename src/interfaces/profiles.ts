export interface IprofilePayload {
  params: {
    include: string;
    requirementId?: string;
    q: string | undefined;
    vendorId?: string;
  };
}
export interface IprofileByIdPayload {
  params: {
    include: string;
  };
}

export interface portfolioMeta {
  keySkills: string;
  yearsOfExp: number;
  education: string;
  certifications: string;
  workExperience: string;
  projects: string;
  highlight: string;
}
export interface addProfile {
  id?: string;
  name?: string;
  vendorId?: string;
  experience?: number;
  costInr?: number;
  designation?: string;
  skills?: Array<string>;
  locations?: Array<string>;
  portfolioMeta?: portfolioMeta;
  imageSlug?: any;
  cvSlug?: any;
  status?: number | boolean;
  profileType?: number;
  keySkills?: string;
  yearsOfExp?: number;
  education?: string;
  certifications?: string;
  workExperience?: string;
  projects?: string;
  highlight?: string;
  email?: string;
  mobile?: string;
}
export interface IAddEditProfileProps {
  handleCancel: () => void;
  refetchAllProfiles: () => void;
  initialValues: addProfile;
  isEditProfileModalOpen: boolean;
  status: boolean;
  setIsFilled: (fill: boolean) => void;
}
export interface IuseAddEditProfileProps {
  handleCancel: () => void;
  refetchAllProfiles: () => void;
  initialValues?: addProfile;
  isEditProfileModalOpen: boolean;
  status: boolean;
}

export interface IProfilesFilter {
  page: number;
  minExperience?: number | null;
  maxExperience?: number | null;
  minCostInr?: number | null;
  maxCostInr?: number | null;
  skills: string;
  locations: string;
}
