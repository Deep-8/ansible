import tagRender from "@/components/tagRenderer";
import { ICompany } from "@/interfaces/company";
import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import React, { FC, useEffect } from "react";
import useAddVendorModal from "./views/useAddVendorModal";
const Option = Select.Option;
interface IAddVendor {
  initialValues: ICompany;
  editModeOn: string;
  setModalOpen: any;
  title: string;
  open: boolean;
  onClose: any;
  refetchAllVendors: () => void;
}
const AddVendor: FC<IAddVendor> = ({
  initialValues,
  editModeOn,
  setModalOpen,
  title,
  open,
  onClose,
  refetchAllVendors,
}) => {
  const {
    handleSubmit,
    editSuccess,
    addSuccess,
    editLoading,
    addLoading,
    setIsFilled,
    handleModalClose,
    allLocation,
    memoizedOnLocationSearch,
    memoizedOnSkillsSearch,
    skillsLoading,
    allSkills,
  } = useAddVendorModal(initialValues, editModeOn, onClose, refetchAllVendors);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      setModalOpen(false);
    }
  }, [addSuccess, editSuccess]);
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
            handleSubmit(values);
            setIsFilled(false);
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
                    Vendor Name<span className="text-red">*</span>
                  </span>
                }
                rules={[
                  { required: true, message: "This is a required field" },
                  { whitespace: true, message: "Cannot have empty spaces" },
                  { min: 3, message: "Should be more than 3" },
                  { max: 100, message: "Should be less than 100" },
                  {
                    pattern: /^[a-zA-Z][a-zA-Z0-9. ]*$/,
                    message: "Please enter a valid Vendor's Name ",
                  },
                ]}
              >
                <Input placeholder="Enter Vendor Name" allowClear />
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
            {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="locations"
                label={
                  <span className=" text-grey text-base mb-2">
                    Location / Remote
                  </span>
                }
              >
                <Select
                  showSearch
                  showArrow
                  allowClear
                  // value={filters.teacher_ids}
                  mode="multiple"
                  tagRender={tagRender}
                  style={{ width: "100%" }}
                  placeholder="Select location"
                  filterOption={false}
                  onSearch={memoizedOnLocationSearch}
                  onChange={() => memoizedOnLocationSearch("")}
                  // onChange={onSelect}
                  notFoundContent={"no search result"}
                >
                  {allLocation?.map((each: any) => (
                    <Option key={each.id} value={each.id}>
                      {each.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
            {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="skills"
                label={
                  <span className=" text-grey text-base mb-2">Skills</span>
                }
              >
                <Select
                  maxTagCount="responsive"
                  showSearch
                  showArrow
                  allowClear={true}
                  // value={skillsQuery}
                  mode="multiple"
                  tagRender={tagRender}
                  style={{ width: "100%", height: "40px" }}
                  placeholder="Select skills"
                  filterOption={false}
                  loading={skillsLoading}
                  onSearch={memoizedOnSkillsSearch}
                  onChange={() => memoizedOnSkillsSearch("")}
                  // onChange={this.onSelect}
                  notFoundContent={"no search result"}
                >
                  {allSkills?.data?.map((each: any) => (
                    <Option key={each.id} value={each.id}>
                      {each.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
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
                    : "bg-page rounded-md text-white px-52"
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

export default AddVendor;
