import Head from "next/head";
import React, { FC } from "react";

interface IHeadTags {
  title: string;
  ogTitle: string;
  ogDesc: string;
  Desc: string;
}

const HeadTags: FC<IHeadTags> = ({ title, ogTitle, ogDesc, Desc }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta name="description" content={Desc} />
    </Head>
  );
};

export default HeadTags;
