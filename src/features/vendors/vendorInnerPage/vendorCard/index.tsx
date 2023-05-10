import AddVendor from "@/components/modals/addVendorModal";
import DeleteModal from "@/components/modals/deleteModal";
import { ICompany } from "@/interfaces/company";
import { useDeleteVendor } from "@/services/vendors";
import { Skeleton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import useVendors from "../../views/useVendors";
import useVendorInnerPage from "../views/useVendorInnerPage";

const VendorCard = ({
  totalProfiles,
  refetchAllVendors,
}: {
  totalProfiles: number;
  refetchAllVendors: () => void;
}) => {
  const { cardData, cardLoading, date, updatedDate } = useVendorInnerPage();
  const [delopen, setDelOpen] = useState<boolean>(false);
  const [ID, setID] = useState<string>("");
  const [cardDelete, setCardDelete] = useState<boolean>(false);
  const { open, setOpen } = useVendors();
  const editAction = (id: string) => {
    setID(id);
    setOpen(true);
  };

  const deleteAction = (id: string) => {
    setID(id);
    setDelOpen(true);
    setCardDelete(true);
  };
  const {
    mutate,
    isLoading: isLoadingDeleteCompany,
    isSuccess,
  } = useDeleteVendor(refetchAllVendors);
  useEffect(() => {
    if (isSuccess) {
      setDelOpen(false);
    }
  }, [isSuccess]);

  const initialValues: ICompany = {
    name: cardData?.data.data.name,
    person: cardData?.data.data.contacts[0].contactPerson,
    email: cardData?.data.data.contacts[0].email,
    mobile: cardData?.data.data.contacts[0].mobile,
  };
  return (
    <div>
      <div className="bg-white border border-blue-border rounded-2xl my-7 p-5 w-full">
        {cardLoading ? (
          <Skeleton avatar={{ shape: "square" }} active />
        ) : (
          <>
            <div className="flex justify-between flex-wrap">
              <div className="flex flex-wrap gap-0 md:gap-3 md:w-5/6 lg:w-11/12 w-full ">
                <div className="background-transition-card-img p-3 rounded">
                  <img src="/assets/vendor_white.svg" className="h-7 w-7" />
                </div>
                <div className="md:w-5/6 lg:w-11/12 w-full">
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
                <button
                  onClick={() => {
                    editAction(cardData?.data.data.id);
                  }}
                >
                  <img
                    src="/assets/edit.svg"
                    alt="bin"
                    className=" max-w-none"
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
              <div className="flex flex-wrap mt-5 lg:gap-20 md:gap-10 ">
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
                  {totalProfiles} profiles
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <AddVendor
        setModalOpen={setOpen}
        open={open}
        title={"Edit Vendor"}
        editModeOn={ID}
        initialValues={initialValues}
        onClose={() => {
          setOpen(false);
        }}
        refetchAllVendors={refetchAllVendors}
      />
      <DeleteModal
        open={delopen}
        idToproceed={ID}
        isLoading={isLoadingDeleteCompany}
        onClose={() => {
          setDelOpen(false);
        }}
        onDelete={() => mutate({ ID, cardDelete })}
      />
    </div>
  );
};

export default VendorCard;
