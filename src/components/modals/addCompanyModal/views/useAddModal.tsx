import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany, editCompany } from "@/services/company";
import { useEffect, useState } from "react";
import { ICompany, IPayloadAddCompany } from "@/interfaces/company";
import useBeforeUnload from "@/utils/useBeforeUnload";

const useAddModal = (
  editModeOn: string,
  setModalOpen: any,
  onClose: () => void,
  refetchAllCompanies: () => void
) => {
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const client = useQueryClient();
  const {
    isLoading: addLoading,
    mutate: addmutate,
    isSuccess: addSuccess,
  } = useMutation((payload: IPayloadAddCompany) => addCompany(payload), {
    onSuccess: () => {
      client.invalidateQueries(["allCompanies"]);
      refetchAllCompanies();
    },
  });

  const {
    isLoading: editLoading,
    mutate: editmutate,
    isSuccess: editSuccess,
  } = useMutation(
    (data: { payload: IPayloadAddCompany; editModeOn: string }) =>
      editCompany(data.payload, data.editModeOn),
    {
      onSuccess: () => {
        client.invalidateQueries(["companyDetails"]);
        // refetchAllCompanies();
      },
    }
  );

  useEffect(() => {
    if (addSuccess || editSuccess) {
      setModalOpen(false);
    }
  }, [addSuccess, editSuccess]);

  const handleSubmit = (values: ICompany) => {
    const payload: IPayloadAddCompany = {
      name: values.name,
      contacts: [
        {
          contactPerson: values.person,
          email: values.email,
          mobile: values.mobile,
        },
      ],
    };
    if (editModeOn == "0") addmutate(payload);
    else editmutate({ payload, editModeOn });
  };
  const handleModalClose = () => {
    if (isFilled) {
      const shouldLeave = confirm(
        "Unsaved changes will be lost. Are you sure you want to continue?"
      );
      if (shouldLeave) {
        onClose();
        setIsFilled(false);
      }
    } else {
      onClose();
    }
  };
  useBeforeUnload(isFilled);
  return {
    addLoading,
    editLoading,
    handleSubmit,
    setIsFilled,
    isFilled,
    handleModalClose,
  };
};

export default useAddModal;
