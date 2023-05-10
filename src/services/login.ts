import { ApiConstants } from "@/constants/apiConstants";
import { ILogin } from "@/interfaces/login";
import { setCookie } from "@/utils/cookies";
import { axiosInstance } from "@/utils/interceptor";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export const loginApi = (session: any) => {
  return axiosInstance
    .post(ApiConstants.LOGIN, {
      idToken: session.idToken,
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
