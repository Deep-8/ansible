import { ApiConstants } from "@/constants/apiConstants";
import { ILogin } from "@/interfaces/login";
import { setCookie } from "@/utils/cookies";
import { axiosInstance } from "@/utils/interceptor";
import Router from "next/router";

export const loginApi = (response: ILogin) => {
  return axiosInstance
    .post(ApiConstants.LOGIN, {
      idToken: response.credential,
    })
    .then(function (response) {
      if (response.status == 200) {
        Router.push({
          pathname: "/dashboard/companies",
          query: { page: 1 },
        });
        setCookie("accessToken", response.data.data.accessToken, 3);
        setCookie("userId", response.data.data.id, 3);
        setCookie("userPic", response.data.data.profilePicSlug, 3);
        setCookie("role", response.data.data.role, 3);
      }
      Router.push({
        pathname: "/dashboard/companies",
        query: { page: 1 },
      });
    });
};
