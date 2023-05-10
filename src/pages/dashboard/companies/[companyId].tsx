import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import CompanyRequirements from "@/features/companies/companyInnerPage/companyRequirements";
import { accessFunction } from "@/utils/accessFunction";
import React from "react";

const index = () => {
  return (
    <>
      <HeadTags
        title={"Company Details"}
        ogTitle={"Company Details"}
        ogDesc={"Company Details"}
        Desc={"Company Details"}
      />
      <MainLayout>
        <CompanyRequirements />
      </MainLayout>
    </>
  );
};

export default index;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
