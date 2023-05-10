import tagRender from "@/components/tagRenderer";
import { IAddRequirementProps } from "@/interfaces/requirements";
import { getCookie } from "@/utils/cookies";

import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Switch,
} from "antd";
import React, { Fragment, useState } from "react";
import useAddRequirement from "./views/useAddRequirement";

const AddRequirement = ({
  handleCancel,
  initialValues,
  isEditRequirementModalOpen,
  refetchAllRequirement,
  // status,
  SetIsfilled,
}: IAddRequirementProps) => {
  const {
    form,
    allSkills,
    addRequirementLoading,
    editRequirementLoading,
    skillsQuery,
    allLocation,
    skillsLoading,
    handleAddRequirement,
    memoizedOnLocationSearch,
    memoizedOnCompanySearch,
    memoizedOnSkillsSearch,
    allCompanies,
    handleEditRequirement,
    memoizedOnAssignedToSearch,
    allUsers,
    userLoading,
  } = useAddRequirement({
    handleCancel,
    refetchAllRequirement,
    // status,
    SetIsfilled,
  });
  const { Option } = AutoComplete;
  return (
    <Form
      form={form}
      preserve={false}
      layout="vertical"
      onFinish={(values) => {
        SetIsfilled(false);
        if (values.maxExperience <= values.minExperience) {
          form.setFields([
            {
              name: "maxExperience",
              errors: ["Max experience can not be less than min experience"],
            },
          ]);
        } else {
          if (isEditRequirementModalOpen) {
            const editPayload = {
              ...values,
              // status: values.status === true ? 1 : 0,
              id: initialValues!.id,
            };
            handleEditRequirement(editPayload);
          } else {
            const addPayload = {
              ...values,
              status: values.status === true ? 1 : 0,
            };
            handleAddRequirement(addPayload);
          }
        }
      }}
      onValuesChange={(value) => {
        SetIsfilled(true);
      }}
      initialValues={initialValues}
    >
      <Row gutter={16} className="my-8">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="companyId"
            label={
              <span className=" text-grey text-base mb-2">
                Company Name <span className="text-red">*</span>
              </span>
            }
            rules={[{ required: true, message: "Please select company" }]}
          >
            <Select
              allowClear={true}
              showSearch
              disabled={initialValues?.id ? true : false}
              showArrow
              style={{ width: "100%", height: "40px" }}
              placeholder="Select company"
              filterOption={false}
              onFocus={() => {}}
              onSearch={memoizedOnCompanySearch}
              // onChange={this.onSelect}
              notFoundContent={"no search result"}
            >
              {allCompanies?.map((each: any) => (
                <Option key={each.id} value={each.id}>
                  {each.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row gutter={8} className="items-center">
            <Col span={11}>
              <Form.Item
                name="minExperience"
                rules={[
                  { required: true, message: "Please enter start range" },
                ]}
                label={
                  <span className=" text-grey text-base mb-2">
                    Experience Range(In years)
                    <span className="text-red">*</span>{" "}
                  </span>
                }
                initialValue={0}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
            <Col span={2} className="text-center">
              --
            </Col>
            <Col span={11}>
              <Form.Item
                name="maxExperience"
                rules={[{ required: true, message: "Please enter end range" }]}
                label={" "}
                initialValue={0}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  min={0}
                  max={100}
                  defaultValue={0}
                  onChange={() => {}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[
              { required: true, message: "Please enter Number of profiles" },
            ]}
            name="noOfDevelopers"
            label={
              <span className=" text-grey text-base mb-2">
                Number Of Profiles<span className="text-red">*</span>{" "}
              </span>
            }
          >
            <InputNumber
              className="w-full"
              size="large"
              min={0}
              max={100}
              defaultValue={0}
              onChange={() => {}}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[
              { required: true, message: "Please enter Budget per month" },
              {
                validator: (_, value) => {
                  if (value < 20000000) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "Budget should be less than 2 crores."
                    );
                  }
                },
              },
            ]}
            name="budgetInr"
            label={
              <span className=" text-grey text-base mb-2">
                Budget Per Month(In ₹, exclusive of all taxes)
                <span className="text-red">*</span>{" "}
              </span>
            }
          >
            <InputNumber
              className="w-full"
              size="large"
              min={0}
              defaultValue={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[{ required: true, message: "Please enter locations" }]}
            name="locations"
            label={
              <span className=" text-grey text-base mb-2">
                Location / Remote<span className="text-red">*</span>{" "}
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
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[{ required: true, message: "Please enter duration" }]}
            name="durationInMonths"
            label={
              <span className=" text-grey text-base mb-2">
                Duration In Months<span className="text-red">*</span>{" "}
              </span>
            }
          >
            <InputNumber
              className="w-full"
              size="large"
              min={0}
              max={100}
              defaultValue={0}
              onChange={() => {}}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[{ required: true, message: "Please enter Skills" }]}
            name="skills"
            label={
              <span className=" text-grey text-base mb-2">
                Skills<span className="text-red">*</span>{" "}
              </span>
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
        </Col>
        {getCookie("role") === "2" ? (
          <Fragment></Fragment>
        ) : (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="assignedTo"
              label={
                <span className=" text-grey text-base mb-2">Assigned to</span>
              }
            >
              <Select
                showSearch
                showArrow
                allowClear
                style={{ width: "100%" }}
                placeholder="Select assigned user"
                filterOption={false}
                loading={userLoading}
                onSearch={memoizedOnAssignedToSearch}
                notFoundContent={"no search result"}
              >
                {allUsers?.map((each: any) => (
                  <Option key={each.id} value={each.id}>
                    {each.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row className="items-center justify-center">
        <Col xs={8} md={4} lg={4}>
          <Button
            block
            size="large"
            htmlType="submit"
            className={
              editRequirementLoading || addRequirementLoading
                ? "bg-white rounded-md "
                : "bg-page  rounded-md hover:bg-main text-white px-52"
            }
            disabled={editRequirementLoading || addRequirementLoading}
          >
            {addRequirementLoading || editRequirementLoading ? (
              <Spin
                spinning={addRequirementLoading || editRequirementLoading}
              ></Spin>
            ) : (
              "Save"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddRequirement;
