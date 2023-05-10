import ButtonComponent from "@/components/button";
import TableComponent from "@/components/tableComponent";
import tagRender from "@/components/tagRenderer";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, MenuProps, Modal, Popover, Select, Slider, Switch } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ViewModal from "./viewModal";
import AddRequirement from "./views/add";
import useAddRequirement from "./views/add/views/useAddRequirement";
import useRequirement from "./views/useRequirement";
const Option = Select.Option;
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <p>1st menu item</p>,
  },
];
const sortByItems: MenuProps["items"] = [
  {
    key: "1",
    label: <p>Recent</p>,
  },
];
const { Search } = Input;
const Requirements = () => {
  const {
    allRequirement,
    location,
    pagination,
    columns,
    isFetching,
    onSearch,
    handleSelectLocation,
    handleChangeExperienceRange,
    handleNumberOfDeveloperChange,
    handleDurationChange,
    handleCancel,
    handleDeleteOk,
    handleDeleteCancel,
    handleOk,
    isEditRequirementModalOpen,
    isAddRequirementModalOpen,
    isDeleteRequirementModalOpen,
    showModal,
    initialValues,
    profileId,
    sliderDev,
    setSliderDev,
    setSliderDuration,
    sliderDuration,
    refetchAllRequirement,
    setIsSliderSetDev,
    sliderSetDev,
    sliderSetDuration,
    setIsSliderSetDuration,
    setSlider,
    slider,
    setIsSliderSet,
    isSliderSet,
    loadingRequirement,
    SetIsfilled,
    handleSelectSkills,
    allSkills,
    memoizedOnLocationSearch,
    memoizedOnSkillSearch,
    handleSelectAssignedTo,
    memoizedOnAssignedToSearch,
    allUsers,
    setIsBudgetSliderSet,
    isBudgetSliderSet,
    handleChangeBudgetRange,
    setSliderBudget,
    sliderBudget,
  } = useRequirement();
  return (
    <div>
      <div className="flex items-center justify-between gap-x-4 gap-y-4 w-full  my-4 flex-wrap">
        <div className="flex items-center gap-x-4 gap-y-4 flex-wrap">
          <div className="bg-white px-6 py-3 h-11 rounded-lg border border-grey-for-border">
            <Popover
              placement="bottom"
              content={
                <div className="w-80">
                  <div className="flex justify-between">
                    <p>
                      Experience{" "}
                      <span className="text-main">
                        {slider[0]} - {slider[1]}
                      </span>{" "}
                    </p>
                    {isSliderSet && (
                      <CloseCircleOutlined
                        className="mt-1 mr-1"
                        onClick={() => {
                          setIsSliderSet(false);
                          handleChangeExperienceRange([0, 100], false);
                          setSlider([0, 100]);
                        }}
                      />
                    )}
                  </div>

                  <Slider
                    onAfterChange={(experienceRange) => {
                      setIsSliderSet(true);
                      handleChangeExperienceRange(experienceRange);
                    }}
                    tooltip={{
                      // open: true,
                      placement: "bottom",
                    }}
                    range
                    onChange={(value) => setSlider(value)}
                    value={slider}
                    defaultValue={[0, 100]}
                  />

                  <div>
                    <div className="flex justify-between mt-1 mr-1">
                      <p>
                        No of profiles{" "}
                        <span className=" text-main">{sliderDev}</span>{" "}
                      </p>
                      {sliderSetDev && (
                        <CloseCircleOutlined
                          className="mt-1 mr-1"
                          onClick={() => {
                            setIsSliderSetDev(false);
                            handleNumberOfDeveloperChange(0, false);
                            setSliderDev(1);
                          }}
                        />
                      )}
                    </div>

                    <div className="flex items-center">
                      <Slider
                        className="flex-1"
                        onAfterChange={(numberOfDevelopers) => {
                          setIsSliderSetDev(true);
                          handleNumberOfDeveloperChange(numberOfDevelopers);
                        }}
                        onChange={(value) => setSliderDev(value)}
                        value={sliderDev}
                        min={1}
                        defaultValue={1}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mt-1 mr-1">
                      <p>
                        Duration(months){" "}
                        <span className=" text-main">{sliderDuration}</span>
                      </p>
                      {sliderSetDuration && (
                        <CloseCircleOutlined
                          className="mt-1 mr-1"
                          onClick={() => {
                            handleDurationChange(null);
                            setSliderDuration(1);
                            setIsSliderSetDuration(false);
                          }}
                        />
                      )}
                    </div>

                    <Slider
                      onAfterChange={(duration) => {
                        setIsSliderSetDuration(true);
                        handleDurationChange(duration);
                      }}
                      min={1}
                      onChange={(value) => setSliderDuration(value)}
                      value={sliderDuration}
                      defaultValue={1}
                    />
                  </div>

                  {/* budget filter */}
                  {/* <div className="flex justify-between">
                    <p>
                      Budget{" "}
                      <span className="text-main">
                        {sliderBudget[0]} - {sliderBudget[1]}
                      </span>
                    </p>
                    {isBudgetSliderSet && (
                      <CloseCircleOutlined
                        className="mt-1 mr-1"
                        onClick={() => {
                          setIsBudgetSliderSet(false);
                          handleChangeBudgetRange([0, 20000000], false);
                          setSliderBudget([0, 20000000]);
                        }}
                      />
                    )}
                  </div>

                  <Slider
                    max={20000000}
                    onAfterChange={(budgetRange) => {
                      setIsBudgetSliderSet(true);
                      handleChangeBudgetRange(budgetRange);
                    }}
                    tooltip={{
                      // open: true,
                      placement: "bottom",
                    }}
                    range
                    onChange={(value) => setSliderBudget(value)}
                    value={sliderBudget}
                    defaultValue={[0, 100]}
                  /> */}

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
                  {/* Assigned to filter */}
                  <div className="mt-3">
                    <label htmlFor="">Select Assigned to</label>
                    <Select
                      allowClear={true}
                      showSearch
                      showArrow
                      bordered={true}
                      tagRender={tagRender}
                      mode="multiple"
                      style={{ width: 300 }}
                      placeholder="Select Assigned to"
                      filterOption={false}
                      onSearch={memoizedOnAssignedToSearch}
                      maxTagCount="responsive"
                      onChange={(assigned) => {
                        memoizedOnAssignedToSearch("");
                        handleSelectAssignedTo(assigned);
                      }}
                      notFoundContent={"no search result"}
                      onClear={() => handleSelectAssignedTo([])}
                    >
                      {allUsers?.map((each: any) => (
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
            </Popover>
          </div>
          <div className="bg-white rounded-lg h-11 border border-grey-for-border">
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
          </div>
          <div className="bg-white p-2 rounded-lg h-11 border border-grey-for-border">
            <Input
              prefix={
                <SearchOutlined style={{ fontSize: 16, color: "#1890ff" }} />
              }
              className="sm:w-56 md:w-80"
              // style={{ width: '348px' }}
              bordered={false}
              placeholder="Search by name, location etc."
              allowClear
              onChange={(event) => onSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="">
          <ButtonComponent text="Add Requirement" clickFn={showModal} />
        </div>
      </div>

      <TableComponent
        className="px-4"
        Datatype={columns}
        tableData={allRequirement}
        isLoading={isFetching}
        paginationData={pagination}
        otherData={{ profileId: profileId }}
      />

      <Modal
        maskClosable={false}
        width={1000}
        title={
          <div className="space-x-4 text-lg">
            <span>
              {!isEditRequirementModalOpen
                ? "Add Requirement"
                : "Edit Requirement"}
            </span>
          </div>
        }
        footer={null}
        open={isAddRequirementModalOpen || isEditRequirementModalOpen}
        onOk={handleOk}
        destroyOnClose
        onCancel={handleCancel}
      >
        <AddRequirement
          isEditRequirementModalOpen={isEditRequirementModalOpen}
          initialValues={initialValues}
          handleCancel={handleCancel}
          refetchAllRequirement={refetchAllRequirement}
          // status={status}
          SetIsfilled={SetIsfilled}
        />
      </Modal>

      {/* <Modal
        maskClosable={false}
        width={800}
        title={<div className="space-x-4 text-2xl">Requirement Details</div>}
        footer={null}
        open={isViewModalOpen}
        centered
        // onOk={handleOk}
        destroyOnClose
        onCancel={viewCancel}
      >
        <ViewModal viewData={viewData} />
      </Modal> */}

      <Modal
        maskClosable={false}
        destroyOnClose
        title="Delete Requirement"
        bodyStyle={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        open={isDeleteRequirementModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        centered
        width={420}
        okButtonProps={{ danger: true, loading: loadingRequirement }}
      >
        <p>Are you sure you want to delete this Requirement ?</p>
      </Modal>
    </div>
  );
};
export default Requirements;
