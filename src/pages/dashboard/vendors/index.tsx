import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import Vendors from "@/features/vendors";
import { accessFunction } from "@/utils/accessFunction";
import React from "react";

const vendors = () => {
  return (
    <>
      <HeadTags
        title={"Vendors"}
        ogTitle={"Vendors"}
        ogDesc={"Vendors"}
        Desc={"Vendors"}
      />
      <MainLayout>
        <Vendors />
      </MainLayout>
    </>
  );
};

export default vendors;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
