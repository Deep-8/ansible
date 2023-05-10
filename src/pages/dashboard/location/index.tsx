import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import React from "react";
import Dashboard from "..";
import Location from "@/features/location";
import { accessFunction } from "@/utils/accessFunction";

const location = () => {
  return (
    <MainLayout>
      <HeadTags
        title={"location"}
        ogTitle={"location"}
        ogDesc={"location"}
        Desc={"location"}
      />
      <Location />
    </MainLayout>
  );
};

export default location;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
