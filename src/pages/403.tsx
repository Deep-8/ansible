import MainLayout from "@/components/mainLayout";
import Image from "next/image";
import Router from "next/router";
import React from "react";

function Page403() {
  return (
    <MainLayout>
      <div className="flex flex-col h-screen justify-center items-center">
        <Image src="/assets/403.webp" height={240} width={240} alt="404" />

        <button
          className="bg-[#43AFFF] text-white w-60 mt-4 rounded py-3 "
          onClick={() => Router.push("/dashboard/companies")}
        >
          Go back to Home page
        </button>
      </div>
    </MainLayout>
  );
}

export default Page403;
