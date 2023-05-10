import TableComponent from "@/components/tableComponent";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/modals/deleteModal";
import useVendors from "./views/useVendors";
import AddVendor from "@/components/modals/addVendorModal";
import { useDeleteVendor } from "@/services/vendors";
import { ICompany } from "@/interfaces/company";
import ButtonComponent from "@/components/button";
import { Input, Popover, Select } from "antd";
import tagRender from "@/components/tagRenderer";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
const Option = Select.Option;

const initialValues: ICompany = {
  name: "",
  person: "",
  email: "",
  mobile: "",
};

const Vendors = () => {
  const {
    vendors,
    isFetching,
    open,
    setOpen,
    delopen,
    setDelOpen,
    ID,
    companyDatatype,
    refetchAllVendors,
    handleSelectSkills,
    memoizedOnSkillSearch,
    handleSelectLocation,
    memoizedOnLocationSearch,
    allSkills,
    location,
    onSearch,
    pagination,
  } = useVendors();

  const {
    mutate,
    isLoading: isLoadingDelete,
    isSuccess,
  } = useDeleteVendor(refetchAllVendors);

  useEffect(() => {
    if (isSuccess) {
      setDelOpen(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div>
        <div className="flex justify-between flex-wrap py-4">
          <div className="flex items-center gap-x-4 gap-y-4 flex-wrap ">
            {/* <div className="bg-white px-6 py-3 h-11 rounded-lg border border-grey-for-border "> */}
            {/* <Popover
                placement="bottom"
                content={
                  <div className="w-80">
                    <div>
                      <label htmlFor="">Select Skills</label>
                      <Select
                        allowClear={true}
                        showSearch
                        showArrow
                        bordered={true}
                        tagRender={tagRender}
                        mode="multiple"
                        style={{ width: 300 }}
                        placeholder="Select Skills"
                        filterOption={false}
                        onSearch={memoizedOnSkillSearch}
                        maxTagCount="responsive"
                        onChange={(skills) => {
                          memoizedOnSkillSearch("");
                          handleSelectSkills(skills);
                        }}
                        notFoundContent={"no search result"}
                        onClear={() => handleSelectSkills([])}
                      >
                        {allSkills?.map((each: any) => (
                          <Option key={each.id} value={each.id}>
                            {each.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                }
              >
                <div className="flex  justify-center items-center">
                  <Image alt="" width={24} height={24} src="/assets/tune.svg" />
                  <span className="text-grey-for-text  opacity-50">Filter</span>
                </div>
              </Popover> */}
          </div>
          {/* <div className="bg-white rounded-lg h-11 border border-grey-for-border">
              <Select
                allowClear={true}
                showSearch
                showArrow
                bordered={false}
                tagRender={tagRender}
                mode="multiple"
                style={{ width: 300 }}
                placeholder="Remote/Location"
                filterOption={false}
                onSearch={memoizedOnLocationSearch}
                maxTagCount="responsive"
                onChange={(locations) => {
                  memoizedOnLocationSearch("");
                  handleSelectLocation(locations);
                }}
                notFoundContent={"no search result"}
                onClear={() => handleSelectLocation([])}
              >
                {location?.map((each: any) => (
                  <Option key={each.id} value={each.id}>
                    {each.name}
                  </Option>
                ))}
              </Select>
            </div> */}
          {/* <div className="bg-white p-2 rounded-lg h-11 border border-grey-for-border">
              <Input
                prefix={
                  <SearchOutlined style={{ fontSize: 16, color: "#1890ff" }} />
                }
                className="sm:w-56 md:w-80"
                style={{ width: "348px" }}
                bordered={false}
                placeholder="Search by name, location etc."
                allowClear
                onChange={(event) => onSearch(event.target.value)}
              />
            </div> */}
          {/* </div> */}
          <div className=" md:pt-0 w-full md:w-fit ">
            <ButtonComponent
              text={"Add Vendor"}
              clickFn={() => setOpen(true)}
            />
          </div>
        </div>
        <TableComponent
          className="px-4 "
          Datatype={companyDatatype}
          tableData={vendors}
          isLoading={isFetching}
          paginationData={pagination}
        />
      </div>
      <AddVendor
        refetchAllVendors={refetchAllVendors}
        setModalOpen={setOpen}
        open={open}
        title={"Add Vendor"}
        initialValues={initialValues}
        editModeOn={"0"}
        onClose={() => {
          setOpen(false);
        }}
      />
      <DeleteModal
        open={delopen}
        idToproceed={ID}
        isLoading={isLoadingDelete}
        onClose={() => {
          setDelOpen(false);
        }}
        onDelete={() => mutate({ ID })}
      />
    </>
  );
};

export default Vendors;
