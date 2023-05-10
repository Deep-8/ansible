import ButtonComponent from "@/components/button";
import SendProfileModal from "@/components/modals/sendProfileModal";
import TableComponent from "@/components/tableComponent";
import tagRender from "@/components/tagRenderer";
import {
  CloseCircleOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Modal, Popover, Select, Slider, Switch } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import AddEditProfile from "./addAndEdit";
import SendProfile from "./sendProfiles";
import useProfiles from "./views/useProfiles";
const Options = Select.Option;
const Profiles = () => {
  const {
    allProfiles,
    isDeleteProfileModalOpen,
    handleDeleteCancel,
    handleDeleteOk,
    setSelectedRow,
    handleSendProfileCancel,
    handleSendProfileOk,
    isSendProfileModalOpen,
    showSendProfileModal,
    showModal,
    isAddProfileModalOpen,
    isEditProfileModalOpen,
    initialValues,
    handleOk,
    handleCancel,
    onSearch,
    handleChangeExperienceRange,
    location,
    handleSelectLocations,
    selectedRow,
    isFetching,
    columns,
    pagination,
    rowSelection,
    refetchAllProfiles,
    requirementId,
    setSlider,
    slider,
    setIsSliderSet,
    isSliderSet,
    loadingProfileDelete,
    status,
    setStatus,
    setIsFilled,
    setIsFilledSendModal,
    allSkills,
    handleSelectSkills,
    memoizedOnLocationSearch,
    memoizedOnSkillSearch,
    sliderCost,
    setIsCostSliderSet,
    setSliderCost,
    handleChangeCostRange,
    isCostSliderSet,
  } = useProfiles();

  return (
    <div>
      <div className="flex items-center justify-between gap-x-4 gap-y-4 w-full  my-4 flex-wrap">
        <div className="flex items-center gap-x-4 gap-y-4 flex-wrap">
          <div className="bg-white px-6 py-3 h-11 w-28 justify-center flex rounded-lg border border-grey-for-border">
            <Popover
              placement="bottom"
              content={
                <div className="w-80">
                  <div>
                    <div className="flex justify-between">
                      <p>
                        Experience{" "}
                        <span className=" text-main">
                          {slider[0]} - {slider[1]}
                        </span>
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

                    {/* cost filter */}
                    <div className="flex justify-between">
                      <p>
                        Cost{" "}
                        <span className="text-main">
                          {sliderCost[0]} - {sliderCost[1]}
                        </span>
                      </p>
                      {isCostSliderSet && (
                        <CloseCircleOutlined
                          className="mt-1 mr-1"
                          onClick={() => {
                            setIsCostSliderSet(false);
                            handleChangeCostRange([0, 20000000], false);
                            setSliderCost([0, 20000000]);
                          }}
                        />
                      )}
                    </div>

                    <Slider
                      max={20000000}
                      step={10000}
                      onAfterChange={(costRange) => {
                        setIsCostSliderSet(true);
                        handleChangeCostRange(costRange);
                      }}
                      tooltip={{
                        // open: true,
                        placement: "bottom",
                      }}
                      range
                      onChange={(value) => setSliderCost(value)}
                      value={sliderCost}
                      defaultValue={[0, 20000000]}
                    />
                  </div>

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
                        <Options key={each.id} value={each.id}>
                          {each.name}
                        </Options>
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
          <div className="bg-white h-11 w-72 justify-center flex rounded-lg border border-grey-for-border">
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
                handleSelectLocations(locations);
              }}
              notFoundContent={"no search result"}
              onClear={() => handleSelectLocations([])}
            >
              {location?.map((each: any) => (
                <Options key={each.id} value={each.id}>
                  {each.name}
                </Options>
              ))}
            </Select>
          </div>

          <div className="bg-white p-2 h-11 rounded-lg border border-grey-for-border">
            <Input
              className="sm:w-56 md:w-80"
              prefix={
                <SearchOutlined style={{ fontSize: 16, color: "#1890ff" }} />
              }
              bordered={false}
              placeholder="Search by name, location etc."
              allowClear
              onChange={(event) => onSearch(event.target.value)}
            />
          </div>
        </div>

        <div>
          {selectedRow?.length <= 0 ? (
            <ButtonComponent text="Add Profile" clickFn={showModal} />
          ) : (
            <ButtonComponent
              text={
                selectedRow?.length === 1 ? "Send Profile" : "Send Profile(s)"
              }
              clickFn={showSendProfileModal}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        {selectedRow?.length > 0 && (
          <div className=" text-sm text-grey ">
            {selectedRow?.length} out of {pagination?.total} Selected
          </div>
        )}
      </div>

      <TableComponent
        rowSelection={rowSelection}
        className="px-4"
        Datatype={columns}
        tableData={allProfiles}
        isLoading={isFetching}
        paginationData={pagination}
        otherData={{ requirementId: requirementId }}
      />

      <Modal
        maskClosable={false}
        width={1000}
        bodyStyle={{ height: 500, padding: "8px", overflow: "scroll" }}
        title={
          <div className="space-x-4">
            <span className=" text-lg">
              {!isEditProfileModalOpen ? "Add Profile" : "Edit Profile"}
            </span>
          </div>
        }
        footer={null}
        open={isAddProfileModalOpen || isEditProfileModalOpen}
        onOk={handleOk}
        destroyOnClose
        onCancel={handleCancel}
      >
        <AddEditProfile
          refetchAllProfiles={refetchAllProfiles}
          isEditProfileModalOpen={isEditProfileModalOpen}
          initialValues={initialValues}
          handleCancel={handleCancel}
          status={status}
          setIsFilled={setIsFilled}
        />
      </Modal>

      <SendProfileModal
        open={isSendProfileModalOpen}
        onOk={handleSendProfileOk}
        onCancel={handleSendProfileCancel}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setIsFilledSendModal={setIsFilledSendModal}
      />
      <Modal
        maskClosable={false}
        destroyOnClose
        title="Delete Profile"
        bodyStyle={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        open={isDeleteProfileModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Delete"
        centered
        width={420}
        okButtonProps={{ danger: true, loading: loadingProfileDelete }}
      >
        <p>Are you sure you want to delete this Profile ?</p>
      </Modal>
    </div>
  );
};

export default Profiles;
