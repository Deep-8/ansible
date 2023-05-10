import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import React from "react";
import Dashboard from "..";
import Skills from "@/features/skills";

const skills = () => {
  return (

    <MainLayout>
      <HeadTags
        title={"skills"}
        ogTitle={"skills"}
        ogDesc={"skills"}
        Desc={"skills"}
      />
      <Skills />
    </MainLayout>
  );
};

export default skills;
