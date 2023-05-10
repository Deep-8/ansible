export interface IVendorTable {
  id: string;
  name: string;
  designation: string;
  experience: number;
  costInr: number;
  imageSlug: string;
  imageMimeType: null;
  portfolioSlug: null;
  status: number;
  pdfStatus: number;
  cvSlug: string;
  cvMimeType: null;
  notes: null;
  createdAt: Date;
  locations: IVendor[];
  skills: IVendor[];
  vendor: IVendor;
}

export interface IVendor {
  id: string;
  name: string;
  isRemote?: number;
  createdAt: Date;
}
