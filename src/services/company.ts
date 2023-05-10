import { ApiConstants } from "@/constants/apiConstants";
import {
  IgetAllCompaniesPayload,
  IPayloadAddCompany,
} from "@/interfaces/company";
import { axiosInstance } from "@/utils/interceptor";
import Router from "next/router";
import { toast } from "react-toastify";

export const getAllCompanies = (payload: IgetAllCompaniesPayload) => {
  return axiosInstance.get(ApiConstants.GETALLCOMPANIES, payload);
};

export const getCompanyRequirements = (id: string, page_no: number = 1) => {
  return axiosInstance.get(ApiConstants.GETALLREQUIREMENTS, {
    params: {
      include: "locations,skills,company",
      companyId: id,
      page: page_no,
    },
  });
};

export const getCompanyDetails = (id: string) => {
  return axiosInstance.get(`${ApiConstants.GETALLCOMPANIES}/${id}`, {
    params: {
      include: "contacts",
    },
  });
};

export const addCompany = (payload: IPayloadAddCompany) => {
  return axiosInstance
    .post(
      ApiConstants.GETALLCOMPANIES,
      {
        ...payload,
      },
      {
        params: {
          include: "contacts",
        },
      }
    )
    .then(function (response) {
      if (response.status == 201) {
        Router.push({
          pathname: Router.pathname,
          query: { page: 1 },
        });
        toast.success("Company Added Successfully");
      }
    });
};

export const editCompany = (
  payload: IPayloadAddCompany,
  editModeOn: string
) => {
  return axiosInstance
    .patch(
      `${ApiConstants.GETALLCOMPANIES}/${editModeOn}`,
      {
        ...payload,
      },
      {
        params: {
          include: "contacts",
        },
      }
    )
    .then(function (response) {
      if (response.status == 200) toast.success("Updated Successfully");
    });
};

export const deleteCompany = (id: string, cardDelete: boolean) => {
  return axiosInstance
    .delete(`${ApiConstants.GETALLCOMPANIES}/${id}`)
    .then(function (response) {
      if (cardDelete == true) Router.back();
      if (response.status == 200) toast.success("Deleted Successfully");
    });
};
export const sendProfiles = (payload: any) => {
  return axiosInstance.get(
    `${ApiConstants.GETALLCOMPANIES}/${payload.id}`,
    payload
  );
};
