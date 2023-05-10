import { ApiConstants } from "@/constants/apiConstants";
import { ILocation, ILocationPayload } from "@/interfaces/location";
import { axiosInstance } from "@/utils/interceptor";
import { toast } from "react-toastify";

export const getAllLocation = (payload: ILocationPayload) => {
  return axiosInstance
    .get(ApiConstants.GET_ALL_LOCATION, payload)
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

export const addLocation = (payload: ILocation) => {
  return axiosInstance
    .post(ApiConstants.GET_ALL_LOCATION, payload)
    .then((res) => {
      if (res.status == 201) {
        toast.success("Location Added Successfully");
        return res.data;
      }
    })
    .catch((error) => {
      // Promise.reject(error)
      return error;
    });
};
export const editLocation = (payload: ILocation) => {
  return axiosInstance
    .patch(`${ApiConstants.GET_ALL_LOCATION}/${payload.id}`, payload)
    .then((res) => {
      if (res.status == 200) {
        toast.success("Location Updated Successfully");
        return res.data;
      }
    })
    .catch((error) => {
      // Promise.reject(error)
      return error;
    });
};

export const deleteLocation = (id: string) => {
  return axiosInstance
    .delete(`${ApiConstants.GET_ALL_LOCATION}/${id}`)
    .then((res) => {
      toast.success("Location Deleted Successfully");
    })
    .catch((error) => {
      return error;
    });
};
