import { ICompany } from "@/interfaces/company";
import { Button, Col, Form, Input, Modal, Row, Spin } from "antd";
import React, { FC } from "react";
import useAddModal from "./views/useAddModal";

interface IAddModal {
  initialValues: ICompany;
  editModeOn: string;
  setModalOpen: any;
  title: string;
  open: boolean;
  onClose: any;
  refetchAllCompanies: () => void;
}

const AddModal: FC<IAddModal> = ({
  initialValues,
  editModeOn,
  setModalOpen,
  title,
  open,
  onClose,
  refetchAllCompanies,
}) => {
  const {
    editLoading,
    addLoading,
    handleSubmit,
    setIsFilled,
    handleModalClose,
  } = useAddModal(editModeOn, setModalOpen, onClose, refetchAllCompanies);

  return (
    <div>
      <Modal
        maskClosable={false}
        title={<div className=" text-xl">{title}</div>}
        centered
        width={1000}
        open={open}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          initialValues={initialValues}
          colon={false}
          layout={"vertical"}
          size={"large"}
          onFinish={(values: ICompany) => {
            setIsFilled(false);
            handleSubmit(values);
          }}
          onValuesChange={() => {
            setIsFilled(true);
          }}
        >
          <Row gutter={30}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label={
                  <span className=" text-grey text-base">
                    Company Name<span className="text-red">*</span>
                  </span>
                }
                rules={[
                  { required: true, message: "This is a required field" },
                  { whitespace: true, message: "Cannot have empty spaces" },
                  { min: 3, message: "Should be more than 3" },
                  { max: 100, message: "Should be less than 100" },
                  {
                    pattern: /^[a-zA-Z][a-zA-Z0-9. ]*$/,
                    message: "Please enter a valid Company's Name ",
                  },
                ]}
              >
                <Input placeholder="Enter Company Name" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="person"
                label={
                  <span className=" text-grey text-base p-0">
                    Contact Person<span className="text-red">*</span>
                  </span>
                }
                rules={[
                  { required: true, message: "This is a required field" },
                  { whitespace: true, message: "Cannot have empty spaces" },
                  { min: 3, message: "Should be more than 3" },
                  { max: 100, message: "Should be less than 100" },
                  {
                    pattern: /^[a-zA-Z][a-zA-Z0-9. ]*$/,
                    message: "Please enter a valid Person's Name ",
                  },
                ]}
              >
                <Input placeholder="Enter Contact Person's name" allowClear />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={30}>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label={
                  <span className=" text-grey text-base">
                    Email ID<span className="text-red">*</span>
                  </span>
                }
                rules={[
                  { required: true, message: "This is a required field" },
                  { type: "email", message: "Invalid email" },
                ]}
              >
                <Input placeholder="Enter Email-id" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="mobile"
                label={
                  <span className=" text-grey text-base">
                    Mobile Number<span className="text-red">*</span>
                  </span>
                }
                rules={[
                  { required: true, message: "This is a required field" },
                  {
                    pattern: /^[+]{0,1}[1-9][0-9]{9,13}$/,
                    message: "Enter valid mobile number",
                  },
                ]}
              >
                <Input placeholder="Enter Mobile Number" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row className="flex justify-center">
            <Col xs={8} md={4} lg={4}>
              <Button
                block
                size="large"
                htmlType="submit"
                className={
                  editLoading || addLoading
                    ? "bg-white rounded-md "
                    : "bg-main rounded-md text-white px-52"
                }
                disabled={editLoading || addLoading}
              >
                {addLoading || editLoading ? (
                  <Spin spinning={addLoading || editLoading}></Spin>
                ) : (
                  "Save"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AddModal;
