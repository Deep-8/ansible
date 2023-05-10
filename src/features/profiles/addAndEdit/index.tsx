import QuillEditor from "@/components/QuillEditor";
import { IAddEditProfileProps } from "@/interfaces/profiles";
import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  Switch,
  Tag,
} from "antd";
import React, { Fragment, useState } from "react";
import useAddEditProfile from "./views/useAddEditProfile";
import Uploader from "@/components/Uploader";
import tagRender from "@/components/tagRenderer";

const uploadProfileButton = () => (
  <div>
    <PlusOutlined />
    <div className="mt-2">Upload</div>
  </div>
);
const uploadResumeButton = () => (
  <Tag className="w-full flex items-center justify-between px-4 py-1">
    <div>Upload File</div>
    <UploadOutlined />
  </Tag>
);

const AddEditProfile = ({
  handleCancel,
  initialValues,
  isEditProfileModalOpen,
  refetchAllProfiles,
  status,
  setIsFilled,
}: IAddEditProfileProps) => {
  const { Option } = AutoComplete;
  const { TextArea } = Input;
  const {
    form,
    options,
    setEducation,
    addProfileLoading,
    editProfileLoading,
    setProjects,
    setKeySkills,
    setWorkExperience,
    setProfileHighlights,
    setCertifications,
    allLocation,
    onFinish,
    memoizedOnLocationSearch,
    allVendors,
    allSkills,
    memoizedOnSkillsSearch,
    skillsLoading,
    memoizedOnVendorSearch,
    setProfileType,
    profileType,
    setIsResumeDeleted,
  } = useAddEditProfile({
    handleCancel,
    isEditProfileModalOpen,
    initialValues,
    refetchAllProfiles,
    status,
  });
  return (
    <Form
      form={form}
      preserve={false}
      layout="vertical"
      onFinish={(values) => {
        setIsFilled(false);
        onFinish(values);
      }}
      initialValues={initialValues}
      onValuesChange={() => setIsFilled(true)}
    >
      <Row gutter={16} className="items-center mt-3 justify-center">
        <Col xs={8} md={4} lg={4} className="flex justify-between">
          <Form.Item name="imageSlug" label={null}>
            <Uploader
              accept="image/jpeg,image/png"
              alreadyUploadedfile={initialValues.imageSlug}
              uploadButton={uploadProfileButton()}
              listType="picture-circle"
              handleUploadFailedOrDelete={() => {
                form.setFields([
                  {
                    name: "imageSlug",
                    errors: ["Please upload image"],
                    value: "",
                  },
                ]);
              }}
              handleUploadSuccess={(slug: string) => {
                form.setFieldValue("imageSlug", slug);
                form.setFields([
                  {
                    name: "imageSlug",
                    errors: [],
                  },
                ]);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* contact person */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[
              { required: true, message: "Please enter name" },
              { min: 3, message: "Should be more than 3" },
              { max: 100, message: "Should be less than 100" },
              {
                pattern: /^[a-zA-Z][a-zA-Z0-9. ]*$/,
                message: "Please enter a valid Name of Profile",
              },
            ]}
            name="name"
            label={
              <span className="text-grey text-base mb-2">
                Name of Profile <span className="text-red">*</span>
              </span>
            }
          >
            <Input
              allowClear={true}
              placeholder="Name of Profile"
              style={{ width: "100%", height: "40px" }}
              className="w-full"
              size="large"
            />
          </Form.Item>
        </Col>
        {/* vendor */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="vendorId"
            label={
              <span className="text-grey text-base mb-2">
                Vendor Name (Not included in Profile PDF){" "}
                <span className="text-red">*</span>{" "}
              </span>
            }
            rules={[{ required: true, message: "Please select vendor" }]}
          >
            <Select
              allowClear={true}
              showSearch
              showArrow
              disabled={
                initialValues?.id || initialValues.vendorId ? true : false
              }
              style={{ width: "100%", height: "40px" }}
              placeholder="Select vendor"
              filterOption={false}
              onFocus={() => {}}
              onSearch={memoizedOnVendorSearch}
              notFoundContent={"no search result"}
            >
              {allVendors?.map((each: any) => (
                <Option key={each.id} value={each.id}>
                  {each.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* experience */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[{ required: true, message: "Please enter experience" }]}
            name="experience"
            label={
              <span className="text-grey text-base mb-2">
                Experience (In years)<span className="text-red">*</span>{" "}
              </span>
            }
          >
            <InputNumber
              placeholder="Select Experience"
              min={0}
              max={100}
              style={{ width: "100%", height: "40px" }}
              className="w-full"
              size="large"
            />
          </Form.Item>
        </Col>
        {/* skills */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[{ required: true, message: "Please enter Skills" }]}
            name="skills"
            label={
              <span className="text-grey text-base mb-2">
                Skills<span className="text-red">*</span>{" "}
              </span>
            }
          >
            <Select
              showSearch
              allowClear={true}
              // value={skillsQuery}
              tagRender={tagRender}
              mode="multiple"
              showArrow
              style={{ width: "100%" }}
              placeholder="Select skills"
              filterOption={false}
              loading={skillsLoading}
              onSearch={memoizedOnSkillsSearch}
              // onChange={this.onSelect}
              onChange={() => memoizedOnSkillsSearch("")}
              notFoundContent={"no search result"}
              autoClearSearchValue={true}
            >
              {allSkills?.data?.map((each: any) => (
                <Option key={each.id} value={each.id}>
                  {each.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* location */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[{ required: true, message: "Please enter locations" }]}
            name="locations"
            label={
              <span className="text-grey text-base mb-2">
                Location/Remote<span className="text-red">*</span>{" "}
              </span>
            }
          >
            <Select
              allowClear={true}
              showSearch
              showArrow
              tagRender={tagRender}
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select location"
              filterOption={false}
              onSearch={memoizedOnLocationSearch}
              notFoundContent={"no search result"}
              onChange={() => memoizedOnLocationSearch("")}
            >
              {allLocation?.map((each: any) => (
                <Option key={each.id} value={each.id}>
                  {each.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* cost per month */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            rules={[
              { required: true, message: "Please enter Cost per month" },
              {
                validator: (_, value) => {
                  if (value < 20000000) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Cost should be less than 2 crores.");
                  }
                },
              },
            ]}
            name="costInr"
            label={
              <span className="text-grey text-base mb-2">
                Cost Per Month (Not included in profile PDF)
                <span className="text-red">*</span>{" "}
              </span>
            }
          >
            <InputNumber
              style={{ width: "100%", height: "40px" }}
              className="w-full"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="email"
            label={<span className=" text-grey text-base mb-2">Email ID</span>}
            rules={[{ type: "email", message: "Invalid email" }]}
          >
            <Input
              style={{ height: "40px" }}
              placeholder="Enter Email-id"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="mobile"
            label={
              <span className=" text-grey text-base mb-2">Mobile Number</span>
            }
            rules={[
              {
                pattern: /^[+]{0,1}[1-9][0-9]{9,13}$/,
                message: "Enter valid mobile number",
              },
            ]}
          >
            <Input
              style={{ height: "40px" }}
              placeholder="Enter Mobile Number"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter role",
              },
              { min: 3, message: "Should be more than 3" },
              { max: 100, message: "Should be less than 100" },
              {
                pattern: /^[a-zA-Z][a-zA-Z0-9@#,.\-&$/ ]*$/,
                message: "Please enter a valid role ",
              },
            ]}
            name="designation"
            label={
              <span className="text-grey text-base mb-2">
                Role<span className="text-red">*</span>{" "}
              </span>
            }
          >
            <Input
              style={{ width: "100%", height: "40px" }}
              className="w-full"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            rules={[
              { min: 3, message: "Should be more than 3" },
              { max: 1000, message: "Should be less than 1000" },
            ]}
            name="description"
            label={
              <span className="text-grey text-base mb-2">
                Description (Included in mail)
              </span>
            }
          >
            <TextArea
              style={{ width: "100%" }}
              className="w-full"
              size="large"
              allowClear
              showCount
              autoSize
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} className="text-page">
        <Col span={24}>
          <Radio.Group
            onChange={(e) => setProfileType(e.target.value)}
            options={options}
            defaultValue={profileType}
          />
        </Col>
        {profileType === 0 ? (
          <Col className="mt-4" span={24}>
            <Form.Item
              name="cvSlug"
              rules={[{ required: true, message: "Please upload CV" }]}
              label={null}
            >
              <Uploader
                alreadyUploadedfile={initialValues.cvSlug}
                wrapperClassName=""
                // listType='picture'
                accept="application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                uploadButton={uploadResumeButton()}
                handleUploadFailedOrDelete={() => {
                  form.setFields([
                    {
                      name: "cvSlug",
                      errors: ["Please upload resume"],
                      value: "",
                    },
                  ]);
                  setIsResumeDeleted(true);
                }}
                handleUploadSuccess={(slug: string) => {
                  form.setFieldValue("cvSlug", slug);
                  form.setFields([
                    {
                      name: "cvSlug",
                      errors: [],
                    },
                  ]);
                  setIsResumeDeleted(false);
                }}
              />
            </Form.Item>
          </Col>
        ) : (
          <Fragment>
            {/* keySkills */}
            <Col className="mt-4" span={24}>
              <Form.Item
                rules={[
                  {
                    type: "string",
                    whitespace: false,
                    required: true,
                    message: "Please enter key skills",
                  },
                ]}
                name="keySkills"
                label={
                  <span className="text-grey text-base mb-2">
                    Key Skills<span className="text-red">*</span>{" "}
                  </span>
                }
              >
                <QuillEditor
                  value={initialValues.keySkills}
                  onChange={setKeySkills}
                />
              </Form.Item>
            </Col>

            {/* profile heighLights */}
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter profile highlights",
                  },
                ]}
                name="highlight"
                label={
                  <span className="text-grey text-base mb-2">
                    Profile Highlights<span className="text-red">*</span>{" "}
                  </span>
                }
              >
                <QuillEditor
                  value={initialValues.highlight}
                  onChange={setProfileHighlights}
                />
              </Form.Item>
            </Col>
            {/* education */}
            <Col span={24}>
              <Form.Item
                rules={[{ required: true, message: "Please enter education" }]}
                name="education"
                label={
                  <span className="text-grey text-base mb-2">
                    Education<span className="text-red">*</span>{" "}
                  </span>
                }
              >
                <QuillEditor
                  value={initialValues.education}
                  onChange={setEducation}
                />
              </Form.Item>
            </Col>
            {/* workExperience */}
            <Col span={24}>
              <Form.Item
                rules={[
                  { required: true, message: "Please enter work experience" },
                ]}
                name="workExperience"
                label={
                  <span className="text-grey text-base mb-2">
                    Work Experience<span className="text-red">*</span>{" "}
                  </span>
                }
              >
                <QuillEditor
                  value={initialValues.workExperience}
                  onChange={setWorkExperience}
                />
              </Form.Item>
            </Col>
            {/* projects */}
            <Col span={24}>
              <Form.Item
                rules={[{ required: true, message: "Please enter projects" }]}
                name="projects"
                label={
                  <span className="text-grey text-base mb-2">
                    Projects<span className="text-red">*</span>{" "}
                  </span>
                }
              >
                <QuillEditor
                  value={initialValues.projects}
                  onChange={setProjects}
                />
              </Form.Item>
            </Col>
            {/* setCertifications */}
            <Col span={24}>
              <Form.Item
                name="certifications"
                label={
                  <span className="text-grey text-base mb-2">
                    Certifications
                  </span>
                }
              >
                <QuillEditor
                  value={initialValues.certifications}
                  onChange={setCertifications}
                />
              </Form.Item>
            </Col>
          </Fragment>
        )}
      </Row>
      <Row className="items-center justify-center">
        <Col xs={8} md={4} lg={4}>
          <Button
            block
            size="large"
            htmlType="submit"
            className={
              editProfileLoading || addProfileLoading
                ? "bg-white rounded-md "
                : "bg-pagended-md hover:bg-main text-white px-52"
            }
            disabled={editProfileLoading || addProfileLoading}
          >
            {addProfileLoading || editProfileLoading ? (
              <Spin spinning={addProfileLoading || editProfileLoading}></Spin>
            ) : (
              "Save"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddEditProfile;
