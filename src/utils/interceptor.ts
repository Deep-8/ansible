import axios from "axios";
import { eraseCookie, getCookie } from "./cookies";
import Router from "next/router";
import { Cookies } from "@/constants/cookie";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

const getGenericErrorMessage = (e: any) => {
  const text = e.response?.data?.errors
    ? // eslint-disable-next-line
      // @ts-ignore
      Object.values(e.response?.data?.errors)[0][0]
    : e.response?.data?.message || "Something went wrong!";
  toast.error(text);
};

axiosInstance.interceptors.request.use((request) => {
  const storedToken = getCookie(Cookies.TOKEN);
  if (storedToken) {
    request.headers!.Authorization = `Bearer ${storedToken}`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    {
      if (error?.response?.status === 401 || error?.response?.status === 402) {
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login/"
        ) {
          toast.error("Unauthorized Access");
          window.location.replace("/");
        }
        eraseCookie(Cookies.TOKEN);
      }
      if (error?.response?.status === 500) {
        toast.error("Internal Server Error");
        // Router.push('/500')
      } else {
        // if (error?.response?.status === 422) {
        //   if (error.response.data.errors["email"]) {
        //     toast.error(error.response.data.errors["email"][0]);
        //   } else toast.error(error.response.data.errors["contacts.0.email"][0]);
        // }
        // if (error?.response?.status === 422) {
        getGenericErrorMessage(error);
        // }
      }
      throw error;
    }

    {
      throw error;
    }
    if (error?.response?.status === 500) {
      toast.error("Internal Server Error");
      Router.push("/500");
    } else {
      if (error?.response?.status !== 422) {
        getGenericErrorMessage(error);
      }
    }
    throw error;
  }
);
