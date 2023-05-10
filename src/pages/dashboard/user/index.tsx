import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import React from "react";
import Dashboard from "..";
import User from "@/features/users";

const user = () => {
  return (
    <MainLayout>
      <HeadTags
        title={"user"}
        ogTitle={"user"}
        ogDesc={"user"}
        Desc={"user"}
      />
      <User />
    </MainLayout>
  );
};

export default user;
