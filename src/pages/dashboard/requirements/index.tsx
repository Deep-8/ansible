import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import Requirements from "@/features/requirements";
import { accessFunction } from "@/utils/accessFunction";
import React from "react";
import Dashboard from "..";

const requirements = () => {
  return (
    <MainLayout>
      <HeadTags
        title={"Requirements"}
        ogTitle={"Requirements"}
        ogDesc={"Requirements"}
        Desc={"Requirements"}
      />
      <Requirements />
    </MainLayout>
  );
};

export default requirements;

export async function getServerSideProps(context: any) {
  return accessFunction(context);
}
