import { ApiConstants } from "@/constants/apiConstants";
import { IUserPayload, Iuser } from "@/interfaces/user";
import { axiosInstance } from "@/utils/interceptor";
import { toast } from "react-toastify";

export const getAllUsers = (payload: IUserPayload) => {
  return axiosInstance
    .get(ApiConstants.GET_ALL_USERS, payload)
    .then((res) => {
      if ((res.status = 200)) {
        return res.data;
      }
    })
    .catch((err) => {
      toast.error("Error in api");
      return err;
    });
};
export const addUser = (payload: Iuser) => {
  return axiosInstance
    .post(ApiConstants.GET_ALL_USERS, payload)
    .then((res) => {
      if (res.status == 201) {
        toast.success("User Added Successfully");
        return res.data;
      }
    })
    .catch((error) => {
      // Promise.reject(error)
      return error;
    });
};
export const editUser = (payload: Iuser) => {
  return axiosInstance
    .patch(`${ApiConstants.GET_ALL_USERS}/${payload.id}`, payload)
    .then((res) => {
      if (res.status == 200) {
        toast.success("User Updated Successfully");
        return res.data;
      }
    })
    .catch((error) => {
      // Promise.reject(error)
      return error;
    });
};
export const deleteUser = (id: string) => {
  return axiosInstance
    .delete(`${ApiConstants.GET_ALL_USERS}/${id}`)
    .then((res) => {
      toast.success("User Deleted Successfully");
    })
    .catch((error) => {
      return error;
    });
};
