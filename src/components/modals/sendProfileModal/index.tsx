import SendProfile from "@/features/profiles/sendProfiles";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface ISendProfileModal {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  setSelectedRow: Dispatch<SetStateAction<Array<any>>>;
  selectedRow: Array<any>;
  setIsFilledSendModal: (fill: boolean) => void;
}
const SendProfileModal = ({
  open,
  onOk,
  onCancel,
  setSelectedRow,
  selectedRow,
  setIsFilledSendModal,
}: ISendProfileModal) => {
  return (
    <Modal
      // width={1000}
      maskClosable={false}
      bodyStyle={{ background: "#FDFCFF" }}
      title="Send Profile(s)"
      footer={null}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <SendProfile
        handleSendProfileOk={onOk}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setIsFilledSendModal={setIsFilledSendModal}
      />
    </Modal>
  );
};

export default SendProfileModal;
