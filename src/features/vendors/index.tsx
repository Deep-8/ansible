import TableComponent from "@/components/tableComponent";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/modals/deleteModal";
import useVendors from "./views/useVendors";
import SubheaderVendor from "@/components/subheader/subheaderVendor";
import AddVendor from "@/components/modals/addVendorModal";
import { useDeleteVendor } from "@/services/vendors";
import { ICompany } from "@/interfaces/company";

const initialValues: ICompany = {
  name: "",
  person: "",
  email: "",
  mobile: "",
};

const Vendors = () => {
  const {
    data,
    isFetching,
    open,
    setOpen,
    delopen,
    setDelOpen,
    ID,
    companyDatatype,
    refetchAllVendors,
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
        <SubheaderVendor
          onOpen={() => {
            setOpen(true);
          }}
        />
        <TableComponent
          className="px-4 "
          Datatype={companyDatatype}
          tableData={data?.data.data}
          isLoading={isFetching}
          paginationData={data?.data?.meta?.pagination}
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
