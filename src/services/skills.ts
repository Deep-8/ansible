import { ApiConstants } from "@/constants/apiConstants";
import { ISkillsPayload, Iskills } from "@/interfaces/skills";
import { axiosInstance } from "@/utils/interceptor";
import { toast } from "react-toastify";

export const getAllSkills = (payload: ISkillsPayload) => {
  return axiosInstance
    .get(ApiConstants.GET_ALL_SKILLS, payload)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch(() => {
      toast.error("Error in api");
    });
};
export const addSkill = (payload: Iskills) => {
  return axiosInstance
    .post(ApiConstants.GET_ALL_SKILLS, payload)
    .then((res) => {
      if (res.status == 201) {
        toast.success("Skill Added Successfully");
        return res.data;
      }
    })
    .catch((error) => {
      // Promise.reject(error)
      return error;
    });
};
export const editSkill = (payload: Iskills) => {
  return axiosInstance
    .patch(`${ApiConstants.GET_ALL_SKILLS}/${payload.id}`, payload)
    .then((res) => {
      if (res.status == 200) {
        toast.success("Skill Updated Successfully");
        return res.data;
      }
    })
    .catch((error) => {
      // Promise.reject(error)
      return error;
    });
};
export const deleteSkill = (id: string) => {
  return axiosInstance
    .delete(`${ApiConstants.GET_ALL_SKILLS}/${id}`)
    .then((res) => {
      toast.success("Skill Deleted Successfully");
    })
    .catch((error) => {
      return error;
    });
};
