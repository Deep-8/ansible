import Header from "@/components/header";
import SendProfileModal from "@/components/modals/sendProfileModal";

import TableComponent from "@/components/tableComponent";
import Profiles from "@/features/profiles";
import AddEditProfile from "@/features/profiles/addAndEdit";
import SendProfile from "@/features/profiles/sendProfiles";
import useProfiles from "@/features/profiles/views/useProfiles";
import { Modal, Switch, Tooltip } from "antd";
import Image from "next/image";
import React from "react";
import useVendors from "../../views/useVendors";
import VendorCard from "../vendorCard";
import useVendorInnerPage from "../views/useVendorInnerPage";

const VendorProfiles = () => {
  const {
    companyDatatype,
    vendorListLoading,
    listingData,
    setPageNumber,
    vendorId,
  } = useVendorInnerPage();
  const { refetchAllVendors } = useVendors();
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
    selectedRow,
    isFetching,
    columns,
    pagination,
    rowSelection,
    refetchAllProfiles,
    status,
    setStatus,
    setIsFilled,
    setIsFilledSendModal,
  } = useProfiles();
  return (
    <>
      <div>
        <VendorCard
          totalProfiles={pagination?.total}
          refetchAllVendors={refetchAllVendors}
        />
        <div className="bg-white  rounded-xl border border-blue-border w-full">
          <div className="flex justify-between pt-5 ">
            <h2 className=" font-semibold text-xl pl-4 text-dark">Profiles</h2>
            {selectedRow?.length <= 0 ? (
              <div className="pr-4 cursor-pointer">
                <Tooltip title="Add">
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    src="/assets/plus_icon.svg"
                    onClick={showModal}
                  />
                </Tooltip>
              </div>
            ) : (
              <div className="pr-4 cursor-pointer flex flex-col justify-end items-end">
                <Tooltip title="Send Profile(s)">
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    src="/assets/send_btn.svg"
                    onClick={showSendProfileModal}
                  />
                </Tooltip>
                <span className="text-grey">
                  {selectedRow.length} out of {pagination?.total}
                </span>
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
            otherData={{ vendorId: vendorId }}
          />
          <Modal
            maskClosable={false}
            width={1000}
            bodyStyle={{ height: 500, padding: "8px", overflow: "scroll" }}
            title={
              <div className="space-x-4">
                <span className="text-lg">
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
            okButtonProps={{ danger: true }}
          >
            <p>Are you sure you want to delete this Profile ?</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default VendorProfiles;
