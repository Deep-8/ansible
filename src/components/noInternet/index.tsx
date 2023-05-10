import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const NoInternet = (open: any) => {
  const router = useRouter();
  return (
    <Fragment>
      <Modal
        maskClosable={false}
        centered
        footer={null}
        closeIcon={<Fragment></Fragment>}
        open={open}
      >
        <div className=" text-2xl text-page">No internet connection</div>
        This will be closed automatically whenever your connection will be back.
        <div className=" text-base py-4"></div>
      </Modal>
    </Fragment>
  );
};

export default NoInternet;
