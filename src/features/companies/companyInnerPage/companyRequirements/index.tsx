import TableComponent from "@/components/tableComponent";
import Requirements from "@/features/requirements";
import AddRequirement from "@/features/requirements/views/add";
import useRequirement from "@/features/requirements/views/useRequirement";
import { Modal, Switch, Tooltip } from "antd";
import Image from "next/image";
import React from "react";
import useCompanies from "../../views/useCompanies";
import CompanyCard from "../companyCard";

import useCompanyInnerPage from "../views/useCompanyInnerPage";

const CompanyRequirements = () => {
  const { companyDatatype, companyListLoading, listingData, companyId } =
    useCompanyInnerPage(false);
  const { refetchAllCompanies } = useCompanies();
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
    refetchAllRequirement,
    status,
    setStatus,
    SetIsfilled,
  } = useRequirement();
  return (
    <>
      <CompanyCard
        totalRequirements={pagination?.total}
        refetchAllCompanies={refetchAllCompanies}
      />
      <div className="bg-white border border-blue-border rounded-xl w-full">
        <div className="flex justify-between pt-5 ">
          <h2 className=" font-semibold text-xl pl-4 text-dark">
            Requirements
          </h2>
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
        </div>

        <TableComponent
          className="px-4"
          Datatype={columns}
          tableData={allRequirement}
          isLoading={isFetching}
          paginationData={pagination}
          otherData={{ companyId: companyId }}
        />
        <Modal
          maskClosable={false}
          width={1000}
          title={
            <div className="space-x-4">
              <span className="space-x-4">
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
            status={status}
            isEditRequirementModalOpen={isEditRequirementModalOpen}
            initialValues={initialValues}
            handleCancel={handleCancel}
            refetchAllRequirement={refetchAllRequirement}
            SetIsfilled={SetIsfilled}
          />
        </Modal>
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
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this Requirement ?</p>
        </Modal>
      </div>
    </>
  );
};

export default CompanyRequirements;
