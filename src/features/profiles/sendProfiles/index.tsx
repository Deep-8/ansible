import tagRender from "@/components/tagRenderer";
import { emailValidator } from "@/utils/validateEmail";
import { AutoComplete, Button, Col, Form, Row, Select, Spin, Tag } from "antd";
import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import useSendProfile from "./views/useSendProfile";
interface IsendProfile {
  selectedRow: Array<any>;
  setSelectedRow: Dispatch<SetStateAction<Array<any>>>;
  handleSendProfileOk: () => void;
  setIsFilledSendModal: (fill: boolean) => void;
}
const SendProfile = ({
  selectedRow,
  setSelectedRow,
  handleSendProfileOk,
  setIsFilledSendModal,
}: IsendProfile) => {
  const {
    allCompanies,
    sendProfilesLoading,
    handleSendProfilesMutate,
    companyContacts,
    setCompanyContacts,
    form,
    memoizedOnCompanySearch,
    setIsFilled,
  } = useSendProfile({ handleSendProfileOk });
  const [showAllProfile, setShowAllProfile] = useState<number>(
    selectedRow.length <= 7 ? selectedRow.length : 7
  );
  const { Option } = AutoComplete;
  const [companyEmails, setCompanyEmails] = useState<Array<any>>([]);
  const [selectedCompanyEmail, setSelectedCompanyEmail] = useState<String>("");

  useEffect(() => {
    const email = companyContacts.length > 0 ? [companyContacts[0].value] : [];
    form.setFieldsValue({
      email,
    });
    setCompanyEmails(email);
    setSelectedCompanyEmail(
      companyContacts.length > 0 ? companyContacts[0].value : ""
    );
  }, [companyContacts]);

  return (
    <div>
      <p className="text-sm text-blueish">
        Selected Profiles ({selectedRow?.length})
      </p>
      <div className="space-y-3 gap-x-2 ml-4 mt-2 mb-4">
        {selectedRow.slice(0, showAllProfile)?.map((each: any) => (
          <Tag
            className={`${
              each.name.length > 30 ? "w-[120]" : ""
            }  items-center `}
            onClose={() =>
              setSelectedRow(
                selectedRow.filter((tag: any) => tag.id !== each.id)
              )
            }
            closable={selectedRow.length > 1}
            color="processing"
            key={each.id}
          >
            {each.name.slice(0, 30)}
          </Tag>
        ))}
        {selectedRow.length > 7 && (
          <span
            onClick={() => {
              if (showAllProfile > 7) {
                setShowAllProfile(7);
              } else {
                setShowAllProfile(selectedRow.length);
              }
            }}
            className="cursor-pointer underline text-xs text-main"
          >
            {showAllProfile > 7 ? "Show Less" : "Show More"}
          </span>
        )}
      </div>

      <Form
        onFinish={(values) => {
          const payload = {
            selectedCompanyEmail: selectedCompanyEmail,
            ...values,
            profiles: selectedRow.map((each: any) => each.id),
          };
          setIsFilledSendModal(false);
          handleSendProfilesMutate(payload);
        }}
        initialValues={{
          vendorId: "",
        }}
        form={form}
        layout="vertical"
        onValuesChange={() => setIsFilledSendModal(true)}
      >
        <Row gutter={16} className="my-4">
          <Col span={24}>
            <Form.Item
              name="companyId"
              label={
                <span className=" text-blueish text-base mb-2">
                  Company Name <span className="text-red">*</span>{" "}
                </span>
              }
              rules={[{ required: true, message: "Please select company" }]}
            >
              <Select
                showSearch
                showArrow
                style={{ width: "100%", height: "40px" }}
                placeholder="Select company"
                filterOption={false}
                onSelect={(value: string) => {
                  form.setFieldValue("companyID", value);
                  setCompanyContacts(
                    allCompanies.filter((each: any) => each.id === value)[0]
                      ?.contacts
                  );
                }}
                onSearch={memoizedOnCompanySearch}
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
          <Col span={24}>
            <Form.Item
              name="email"
              label={
                <span className="text-base mb-2 text-blueish">Emails</span>
              }
              rules={[
                {
                  validator: emailValidator,
                  message: "Invalid email",
                },
              ]}
              initialValue={companyEmails}
            >
              <Select
                tagRender={(values) => {
                  if (values.value == selectedCompanyEmail) {
                    values.closable = false;
                  }
                  return tagRender(values);
                }}
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Enter email"
                showSearch={false}
                popupClassName="select_dropdown_no_popup"
                options={companyContacts}
                onInputKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    return event.stopPropagation();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className=" items-center justify-center">
          <Col xs={8} md={4} lg={4}>
            <Button
              size="large"
              htmlType="submit"
              className={
                sendProfilesLoading
                  ? "bg-white rounded-md "
                  : "bg-page  rounded-md hover:bg-main text-white px-52"
              }
              disabled={sendProfilesLoading}
            >
              {sendProfilesLoading ? (
                <Spin spinning={sendProfilesLoading}></Spin>
              ) : (
                "Send Profiles"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SendProfile;
