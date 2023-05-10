import { ApiConstants } from "@/constants/apiConstants";
import {
  addProfile,
  IprofileByIdPayload,
  IprofilePayload,
} from "@/interfaces/profiles";
import { axiosInstance } from "@/utils/interceptor";
import Router from "next/router";
import { toast } from "react-toastify";

export const getAllProfiles = (payload: IprofilePayload) => {
  return axiosInstance
    .get(ApiConstants.GET_ALL_PROFILES, payload)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch(() => {
      toast.error("Error in api");
    });
};

export const getProfileByID = (
  payload: IprofileByIdPayload,
  profileByid: string
) => {
  return axiosInstance
    .get(ApiConstants.GET_ALL_PROFILES + `/${profileByid}`, payload)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch(() => {
      toast.error("Error in api");
    });
};

export const addNewProfile = (payload: addProfile) => {
  return axiosInstance
    .post(ApiConstants.GETALLPROFILES, payload)
    .then(function (response) {
      if (response.status == 201) {
        Router.push({
          pathname: Router.pathname,
          query: { page: 1 },
        });
      }

      return response;
    });
};

export const editProfile = (payload: addProfile) => {
  return axiosInstance
    .patch(`${ApiConstants.GETALLPROFILES}/${payload.id}`, payload, {})
    .then((res) => {
      return res;
    });
};
//deleteProfile
export const deleteProfile = (id: string) => {
  return axiosInstance
    .delete(`${ApiConstants.GETALLPROFILES}/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
