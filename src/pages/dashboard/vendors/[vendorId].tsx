import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import VendorProfiles from "@/features/vendors/vendorInnerPage/vendorProfiles";
import { accessFunction } from "@/utils/accessFunction";
import React from "react";

const index = () => {
  return (
    <div>
      <HeadTags
        title={"Vendor Details"}
        ogTitle={"Vendor Details"}
        ogDesc={"Vendor Details"}
        Desc={"Vendor Details"}
      />
      <MainLayout>
        <VendorProfiles />
      </MainLayout>
    </div>
  );
};

export default index;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
