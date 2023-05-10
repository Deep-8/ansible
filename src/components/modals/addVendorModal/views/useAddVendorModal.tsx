import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addVendor, editVendor } from "@/services/vendors";
import { IPayloadAddCompany } from "@/interfaces/company";
import { useState } from "react";
import useBeforeUnload from "@/utils/useBeforeUnload";
interface ICompany {
  name: string;
  person: string;
  email: string;
  mobile: string;
}

const useAddVendorModal = (
  initialValues: ICompany,
  editModeOn: string,
  onClose: () => void,
  refetchAllVendors: () => void
) => {
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const client = useQueryClient();
  const {
    isLoading: addLoading,
    mutate: addmutate,
    isSuccess: addSuccess,
  } = useMutation((payload: any) => addVendor(payload), {
    onSuccess: () => {
      client.invalidateQueries(["allVendors"]);
      // refetchAllVendors();
    },
  });

  const {
    isLoading: editLoading,
    mutate: editmutate,
    isSuccess: editSuccess,
  } = useMutation(
    (data: { payload: any; editModeOn: string }) =>
      editVendor(data.payload, data.editModeOn),
    {
      onSuccess: () => {
        client.invalidateQueries(["vendorDetails"]);
      },
    }
  );
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
    handleSubmit,
    addSuccess,
    editSuccess,
    editLoading,
    addLoading,
    setIsFilled,
    handleModalClose,
  };
};

export default useAddVendorModal;
