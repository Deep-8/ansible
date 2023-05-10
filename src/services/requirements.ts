import { ApiConstants } from "@/constants/apiConstants";

import {
  addRequirements,
  IrequirementPayload,
} from "@/interfaces/requirements";
import { axiosInstance } from "@/utils/interceptor";
import Router from "next/router";
import { toast } from "react-toastify";

export const getAllRequirements = (payload: IrequirementPayload) => {
  return axiosInstance
    .get(ApiConstants.GETALLREQUIREMENTS, payload)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch(() => {
      toast.error("Error in api");
    });
};

export const getRequirementDetails = (id: string) => {
  return axiosInstance.get(`${ApiConstants.GETALLREQUIREMENTS}/${id}`, {
    params: {
      include: "locations,skills,company,assignedTo,createdBy",
    },
  });
};

export const addNewRequirements = (payload: addRequirements) => {
  return axiosInstance
    .post(ApiConstants.GETALLREQUIREMENTS, payload)
    .then(function (response) {
      if (response.status == 201) {
        Router.push({
          pathname: Router.pathname,
          query: { page: 1 },
        });
        toast.success("Requirement Added Successfully");
      }

      return response;
    })
    .catch(() => {
      toast.error("Error in api");
    });
};
export const editRequirements = (payload: addRequirements) => {
  return axiosInstance
    .patch(`${ApiConstants.GETALLREQUIREMENTS}/${payload.id}`, payload, {})
    .then(function (response) {
      if (response.status == 200) {
        toast.success("Updated Successfully");
      }
      return response;
    })
    .catch(() => {
      toast.error("Error in api");
    });
};

export const deleteRequirement = (id: string) => {
  return axiosInstance
    .delete(`${ApiConstants.GETALLREQUIREMENTS}/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
