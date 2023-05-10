import { Spin } from "antd";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import Companies from "../companies";
import useLogin from "./views/useLogin";

const Login = () => {
  const { data: session, status } = useSession();
  const {} = useLogin(session, status);

  return (
    <>
      {status !== "loading" ? (
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
                  onClick={(event) => {
                    event.preventDefault();
                    signIn("google");
                  }}
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
      ) : (
        <div className="h-screen w-screen bg-white flex justify-center items-center">
          <Spin />
        </div>
      )}
    </>
  );
};

export default Login;
