import { Modal } from "antd";
import React, { FC } from "react";
import { useDeleteCompany } from "./views/useDeleteCompany";

const DeleteModal: FC<any> = ({
  open,
  onDelete,
  onClose,
  isLoading,
  refetchAllCompanies,
}) => {
  const {} = useDeleteCompany(refetchAllCompanies);
  return (
    <div>
      <Modal
        maskClosable={false}
        bodyStyle={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        title="Delete Task"
        centered
        open={open}
        onOk={() => onDelete()}
        confirmLoading={isLoading}
        onCancel={() => onClose()}
        okText="Delete"
        okButtonProps={{ danger: true }}
        width={420}
      >
        <p>Are you sure you want to delete this task ?</p>
      </Modal>
    </div>
  );
};

export default DeleteModal;
