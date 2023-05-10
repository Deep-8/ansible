import HeadTags from "@/components/headTags";
import MainLayout from "@/components/mainLayout";
import React from "react";
import Dashboard from "..";
import Location from "@/features/location";

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
