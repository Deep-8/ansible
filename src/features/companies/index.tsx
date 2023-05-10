import React, { useEffect } from "react";
import useCompanies from "./views/useCompanies";
import SubheaderCompany from "@/components/subheader/subheaderCompany";
import AddModal from "@/components/modals/addCompanyModal";
import TableComponent from "@/components/tableComponent";
import DeleteModal from "@/components/modals/deleteModal";
import { useDeleteCompany } from "@/components/modals/deleteModal/views/useDeleteCompany";
import { ICompany } from "@/interfaces/company";

const initialValues: ICompany = {
  name: "",
  person: "",
  email: "",
  mobile: "",
};

const Companies = () => {
  const {
    data,
    isFetching,
    open,
    setOpen,
    delopen,
    setDelOpen,
    ID,
    companyDatatype,
    refetchAllCompanies,
  } = useCompanies();
  const {
    mutate,
    isLoading: isLoadingDeleteCompany,
    isSuccess,
  } = useDeleteCompany(refetchAllCompanies);
  useEffect(() => {
    if (isSuccess) {
      setDelOpen(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div>
        <SubheaderCompany
          onOpen={() => {
            setOpen(true);
          }}
        />

        <TableComponent
          Datatype={companyDatatype}
          tableData={data?.data.data}
          isLoading={isFetching}
          paginationData={data?.data?.meta?.pagination}
        />
      </div>

      <AddModal
        setModalOpen={setOpen}
        title={"Add Company"}
        initialValues={initialValues}
        editModeOn={"0"}
        open={open}
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
        onDelete={() => mutate({ ID })}
      />
    </>
  );
};

export default Companies;
