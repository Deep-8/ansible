import { axiosInstance } from "@/utils/interceptor";
import { Spin } from "antd";
import axios from "axios";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import useLogin from "./views/useLogin";

const Login = () => {
  const { isLoading } = useLogin();

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="container gradientbg">
          <>
            <div className="flex flex-wrap lg:mx-0 mx-4 gap-24 justify-center items-center pt-40">
              <div>
                <Image
                  src="/assets/login-group.svg"
                  alt="login-group"
                  width={600}
                  height={100}
                />
              </div>
              <div className="flex flex-col">
                <Image
                  className=" mx-auto lg:mx-0"
                  src="/assets/crewlogo.png"
                  alt="SB-logo"
                  width={250}
                  height={200}
                />
                <div className=" text-4xl font-medium mt-7">
                  Login to <span className="text-main">Compass</span>
                </div>
                <button
                  id="glogin"
                  className=" flex items-center justify-center rounded-lg border-main border-2 mt-9"
                >
                  <Image
                    src="/assets/google.png"
                    alt="googleicon"
                    width={60}
                    height={60}
                  />
                  <div className="text-grey text-xl">Login with google</div>
                </button>
              </div>
            </div>
          </>
        </div>
      </Spin>
    </>
  );
};

export default Login;
