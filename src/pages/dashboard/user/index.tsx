import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import React from "react";
import User from "@/features/users";
import { userAccessFunction } from "@/utils/accessFunction";

const user = () => {
  return (
    <MainLayout>
      <HeadTags title={"user"} ogTitle={"user"} ogDesc={"user"} Desc={"user"} />
      <User />
    </MainLayout>
  );
};

export default user;

export async function getServerSideProps(context: any) {
  return userAccessFunction(context);
}
