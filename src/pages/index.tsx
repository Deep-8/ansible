import HeadTags from "@/components/headTags";
import Login from "@/features/login";
import { loginAccessFunction } from "@/utils/accessFunction";
import React from "react";

const index = () => {
  return (
    <div>
      <HeadTags
        title={"Compass"}
        ogTitle={"Login"}
        ogDesc={"Compass of Crewmate by Squareboat."}
        Desc={"Compass of Crewmate by Squareboat."}
      />

      <Login />
    </div>
  );
};

export default index;

export async function getServerSideProps(context: any) {
  return loginAccessFunction(context);
}
