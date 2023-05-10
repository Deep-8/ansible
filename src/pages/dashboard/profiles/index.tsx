import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import Profiles from "@/features/profiles";
import { accessFunction } from "@/utils/accessFunction";
import React from "react";

const profiles = () => {
  return (
    <MainLayout>
      <HeadTags
        title={"Profiles"}
        ogTitle={"Profiles"}
        ogDesc={"Profiles"}
        Desc={"Profiles"}
      />
      <Profiles />
    </MainLayout>
  );
};

export default profiles;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
