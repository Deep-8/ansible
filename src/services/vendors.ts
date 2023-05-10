import { ApiConstants } from "@/constants/apiConstants";
import { IPayloadAddCompany } from "@/interfaces/company";
import { axiosInstance } from "@/utils/interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Router from "next/router";
import { toast } from "react-toastify";

export const getAllVendors = (page: number = 1) => {
  return axiosInstance.get(ApiConstants.GETALLVENDORS, {
    params: {
      include: "contacts",
      page: page,
    },
  });
};
export const getAllVendorsWithFilters = (payload: any) => {
  return axiosInstance.get(ApiConstants.GETALLVENDORS, payload);
};

export const getVendorProfiles = (id: string, page: number = 1) => {
  return axiosInstance.get(ApiConstants.GETALLPROFILES, {
    params: {
      include: "locations,skills,vendor",
      vendorId: id,
      page: page,
    },
  });
};

export const getVendorDetails = (id: string) => {
  return axiosInstance.get(`${ApiConstants.GETALLVENDORS}/${id}`, {
    params: {
      include: "contacts",
    },
  });
};

export const addVendor = (payload: IPayloadAddCompany) => {
  return axiosInstance
    .post(
      ApiConstants.GETALLVENDORS,
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
        toast.success("Vendor Added Successfully");
      }
    });
};

export const editVendor = (payload: IPayloadAddCompany, editModeOn: string) => {
  return axiosInstance
    .put(
      `${ApiConstants.GETALLVENDORS}/${editModeOn}`,
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

const deleteVendor = (id: string, cardDelete: boolean) => {
  return axiosInstance
    .delete(`${ApiConstants.GETALLVENDORS}/${id}`)
    .then(function (response) {
      if (cardDelete == true) Router.back();
      if (response.status == 200) toast.success("Deleted Successfully");
    });
};
export const useDeleteVendor = (refetchAllVendors: () => void) => {
  const client = useQueryClient();
  const { mutate, isSuccess, isLoading } = useMutation(
    (data: { ID: string; cardDelete?: boolean }) =>
      deleteVendor(data.ID, data.cardDelete || false),
    {
      onSuccess: () => {
        client.invalidateQueries(["allVendors"]);
        refetchAllVendors();
      },
    }
  );
  return { mutate, isSuccess, isLoading };
};
