import AddModal from "@/components/modals/addCompanyModal";
import DeleteModal from "@/components/modals/deleteModal";
import { Skeleton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import useCompanyInnerPage from "../views/useCompanyInnerPage";
import { useDeleteCompany } from "@/components/modals/deleteModal/views/useDeleteCompany";
import { ICompany } from "@/interfaces/company";

const CompanyCard = ({
  totalRequirements,
  refetchAllCompanies,
}: {
  totalRequirements: number;
  refetchAllCompanies: () => void;
}) => {
  const {
    mutate,
    isLoading: isLoadingDeleteCompany,
    isSuccess,
  } = useDeleteCompany(refetchAllCompanies);
  const {
    cardData,
    cardLoading,
    deleteAction,
    editAction,
    ID,
    setDelOpen,
    setOpen,
    cardDelete,
    delopen,
    open,
    date,
    updatedDate,
  } = useCompanyInnerPage(isSuccess);

  const initialValues: ICompany = {
    name: cardData?.data.data.name,
    person: cardData?.data.data.contacts[0].contactPerson,
    email: cardData?.data.data.contacts[0].email,
    mobile: cardData?.data.data.contacts[0].mobile,
  };

  return (
    <div>
      <div className="bg-white border border-blue-border rounded-2xl my-7 p-6 w-full md:w-full">
        {cardLoading ? (
          <Skeleton avatar={{ shape: "square" }} active />
        ) : (
          <>
            <div className="flex justify-between flex-wrap ">
              <div className="flex flex-wrap gap-3 w-full md:w-5/6 lg:w-11/12">
                <div className="background-transition-card-img p-4 rounded ">
                  <img src="/assets/company_white.svg" className="h-6 w-6" />
                </div>
                <div className="w-full md:w-5/6 lg:w-11/12">
                  <h1 className="text-page text-3xl text-ellipsis overflow-hidden whitespace-nowrap">
                    <Tooltip title={cardData?.data.data.name}>
                      {cardData?.data.data.name}
                    </Tooltip>
                  </h1>
                  <div className="flex w-96 justify-between ">
                    <div className="text-grey-med text-sm">Added on {date}</div>
                    <div className="text-grey-med text-sm">
                      Updated on {updatedDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <button>
                  <img
                    src="/assets/edit.svg"
                    alt="bin"
                    className=" max-w-none"
                    onClick={() => {
                      editAction(cardData?.data.data.id);
                    }}
                  />
                </button>
                <button
                  onClick={() => {
                    deleteAction(cardData?.data.data.id);
                  }}
                >
                  {" "}
                  <img
                    src="/assets/bin.svg"
                    alt="bin"
                    className=" max-w-none"
                  />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-wrap lg:gap-20 md:gap-10 mt-5 ">
                <div>
                  <div className="text-grey-med text-sm">CONTACT PERSON </div>
                  <div className="text-base text-ellipsis overflow-hidden whitespace-nowrap w-44 md:w-48 mt-1 text-dark">
                    <Tooltip
                      title={cardData?.data.data.contacts[0].contactPerson}
                    >
                      {cardData?.data.data.contacts[0].contactPerson}
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <div className="text-grey-med text-sm ">PHONE NO. </div>
                  <div className="text-base mt-1 text-dark">
                    {cardData?.data.data.contacts[0].mobile}
                  </div>
                </div>
                <div>
                  <div className="text-grey-med text-sm">EMAIL</div>
                  <div className="text-base text-ellipsis overflow-hidden whitespace-nowrap w-44 md:w-80 mt-1 text-dark">
                    <Tooltip title={cardData?.data.data.contacts[0].email}>
                      {cardData?.data.data.contacts[0].email}
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-grey-med text-sm"></div>
                <div className="text-base mt-11 text-page font-medium">
                  {totalRequirements} requirements
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <AddModal
        setModalOpen={setOpen}
        open={open}
        title={"Edit Company"}
        editModeOn={ID}
        initialValues={initialValues}
        onClose={() => {
          setOpen(false);
        }}
        refetchAllCompanies={refetchAllCompanies}
      />
      <DeleteModal
        open={delopen}
        idToproceed={ID}
        isLoading={isLoadingDeleteCompany}
        onClose={() => {
          setDelOpen(false);
        }}
        onDelete={() => mutate({ ID, cardDelete })}
        refetchAllCompanies={refetchAllCompanies}
      />
    </div>
  );
};

export default CompanyCard;
