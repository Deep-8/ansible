import MainLayout from "@/components/mainLayout";
import { accessFunction } from "@/utils/accessFunction";
import HeadTags from "@/components/headTags";
import React from "react";
import RequirementViewModal from "@/features/requirements/viewModal";

const index = () => {
  return (
    <>
      <HeadTags
        title={"Requirement Details"}
        ogTitle={"Requirement Details"}
        ogDesc={"Requirement Details"}
        Desc={"Requirement Details"}
      />
      <MainLayout>
        <RequirementViewModal />
      </MainLayout>
    </>
  );
};

export default index;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
