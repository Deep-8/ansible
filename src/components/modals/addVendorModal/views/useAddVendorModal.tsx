import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addVendor, editVendor } from "@/services/vendors";
import { IPayloadAddCompany } from "@/interfaces/company";
import { useCallback, useState } from "react";
import useBeforeUnload from "@/utils/useBeforeUnload";
import { getAllLocation } from "@/services/location";
import { ILocationPayload } from "@/interfaces/location";
import useDebounce from "@/utils/useDebounce";
import { ISkillsPayload } from "@/interfaces/skills";
import { getAllSkills } from "@/services/skills";
interface ICompany {
  name: string;
  person: string;
  email: string;
  mobile: string;
  locations?: string;
  skills?: string;
}

const useAddVendorModal = (
  initialValues: ICompany,
  editModeOn: string,
  onClose: () => void,
  refetchAllVendors: () => void
) => {
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const client = useQueryClient();
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [skillsQuery, setSkillsQuery] = useState<string>("");
  const debouncedLocationQuery = useDebounce(locationQuery);
  const debouncedSkillsQuery = useDebounce(skillsQuery);
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
  const { data: allSkills, isFetching: skillsLoading } = useQuery({
    queryKey: ["allskills", debouncedSkillsQuery],
    queryFn: () => {
      const skillsPayload: ISkillsPayload = {
        params: {
          paginate: false,
          q: debouncedSkillsQuery,
        },
      };
      return getAllSkills(skillsPayload);
    },
    select: (data) => {
      return {
        ...data,
        data: data.data.map((each: any) => ({
          ...each,
          value: each.id,
          label: each.name,
        })),
      };
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
  const { data: allLocation, isFetching: locationLoading } = useQuery({
    queryKey: ["allLocation", debouncedLocationQuery],
    queryFn: () => {
      const locationPayload: ILocationPayload = {
        params: {
          paginate: false,
          q: debouncedLocationQuery,
          sort: "isRemote:desc",
        },
      };
      return getAllLocation(locationPayload);
    },
    select: (data) => {
      return {
        ...data,
        data: data.data.map((each: any) => ({
          ...each,
          value: each.id,
          label: each.name,
        })),
      };
    },
  });
  const memoizedOnLocationSearch = useCallback((value: string) => {
    setLocationQuery(value);
  }, []);
  const memoizedOnSkillsSearch = useCallback((value: string) => {
    setSkillsQuery(value);
  }, []);
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
      locations: values.locations,
      skills: values.skills,
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
    allLocation: allLocation?.data,
    memoizedOnLocationSearch,
    allSkills,
    memoizedOnSkillsSearch,
    skillsLoading,
  };
};

export default useAddVendorModal;
