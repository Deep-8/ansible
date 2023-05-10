import MainLayout from "@/components/mainLayout";
import { accessFunction } from "@/utils/accessFunction";
import HeadTags from "@/components/headTags";
import React from "react";
import ProfileViewModal from "@/features/profiles/viewModal/views";

const index = () => {
  return (
    <>
      <HeadTags
        title={"Profile Details"}
        ogTitle={"Profile Details"}
        ogDesc={"Profile Details"}
        Desc={"Profile Details"}
      />
      <MainLayout>
        <ProfileViewModal />
      </MainLayout>
    </>
  );
};

export default index;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
