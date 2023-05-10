import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import Companies from "@/features/companies";
import { accessFunction } from "@/utils/accessFunction";
import React from "react";

const index = () => {
  return (
    <>
      <HeadTags
        title="Companies"
        ogTitle="Companies"
        ogDesc="Companies"
        Desc="Companies"
      />
      <MainLayout>
        <Companies />
      </MainLayout>
    </>
  );
};

export default index;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
