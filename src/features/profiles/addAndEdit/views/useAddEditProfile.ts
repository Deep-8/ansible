import { useEffect } from "react";
import { ILocationPayload } from "@/interfaces/location";
import { addProfile, IuseAddEditProfileProps } from "@/interfaces/profiles";
import { ISkillsPayload } from "@/interfaces/skills";
import { getAllLocation } from "@/services/location";
import { addNewProfile, editProfile } from "@/services/profiles";
import { getAllSkills } from "@/services/skills";
import { getAllVendorsWithFilters } from "@/services/vendors";
import useDebounce from "@/utils/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const options = [
  { label: "Upload CV", value: 0 },
  { label: "Build Custom Profile", value: 1 },
];
const useAddEditProfile = ({
  handleCancel,
  isEditProfileModalOpen,
  initialValues,
  refetchAllProfiles,
  status,
}: IuseAddEditProfileProps) => {
  const client = useQueryClient();
  const [form] = Form.useForm();
  const [isResumeDeleted, setIsResumeDeleted] = useState(false);

  const [skillsQuery, setSkillsQuery] = useState<string>("");
  const [vendorQuery, setVendorQuery] = useState<string>("");
  const debouncedVendorQuery = useDebounce(vendorQuery);
  const debouncedSkillsQuery = useDebounce(skillsQuery);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const debouncedLocationQuery = useDebounce(locationQuery);

  const { data: allVendors, isFetching: allVendorsLoading } = useQuery({
    queryKey: ["allvendor", debouncedVendorQuery],
    queryFn: () => {
      const payload: ISkillsPayload = {
        params: {
          paginate: false,
          q: debouncedVendorQuery,
        },
      };
      return getAllVendorsWithFilters(payload);
    },
    select: (data) => {
      return {
        ...data.data,
        data: data.data.data.map((each: any) => ({
          ...each,
          value: each.id,
          label: each.name,
        })),
      };
    },
  });

  // add profile
  const {
    isLoading: addProfileLoading,
    mutate: addProfileMutate,
    isSuccess: addSuccess,
  } = useMutation((payload: addProfile) => addNewProfile(payload), {
    onSuccess: () => {
      toast.success("Profile Added Successfully");
      client.invalidateQueries(["allProfiles"]);
      refetchAllProfiles();
    },
  });
  // edit profile
  const {
    isLoading: editProfileLoading,
    mutate: editProfileMutate,
    isSuccess: editSuccess,
  } = useMutation((payload: addProfile) => editProfile(payload), {
    onSuccess: (data) => {
      toast.success("Profile Updated Successfully");
      client.invalidateQueries(["allProfiles"]);
      refetchAllProfiles();
    },
  });

  const memoizedOnVendorSearch = useCallback((value: string) => {
    setVendorQuery(value);
  }, []);
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
  const memoizedOnSkillsSearch = useCallback((value: string) => {
    setSkillsQuery(value);
  }, []);
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
  const handleAddProfile = (values: any) => {
    addProfileMutate(values);
  };
  const handleEditProfile = (values: any) => {
    editProfileMutate(values);
  };
  const onFinish = (values: any) => {
    const portfolioMeta = {
      portfolioMeta: {
        others: values?.others,
        projects: values?.projects,
        education: values?.education,
        keySkills: values?.keySkills,
        workExperience: values?.workExperience,
        certifications: values?.certifications,
        highlight: values?.highlight,
      },
    };
    let addProfilePayload = {
      ...values,
      email: values.email === "" ? undefined : values.email,
      mobile: values.mobile === "" ? undefined : values.mobile,

      ...(!initialValues!.id && { status: 1 }),
      // if profileType===1 then append object
      ...(profileType === 1 && portfolioMeta),
      // if imageSlug have some value then append object
      ...(values.imageSlug && {
        image: {
          slug: values?.imageSlug?.key ?? values.imageSlug,
          mimeType: "image/png",
        },
      }),
      ...(values.cvSlug && {
        resume: {
          slug: values.cvSlug?.key ?? values.cvSlug,
          mimeType: "application/pdf",
        },
      }),
      ...(isResumeDeleted === true && {
        resume: null,
      }),
      ...(initialValues!.id && { id: initialValues!.id }),
    };

    if (isEditProfileModalOpen) {
      handleEditProfile(addProfilePayload);
    } else {
      handleAddProfile(addProfilePayload);
    }
  };
  const setOtherValue = (values: string) => {
    form.setFieldValue("others", values);
  };
  const setProfileHighlights = (values: string) => {
    form.setFieldValue("highlight", values);
  };
  const setEducation = (values: string) => {
    form.setFieldValue("education", values);
  };
  const setProjects = (values: string) => {
    form.setFieldValue("projects", values);
  };
  const setCertifications = (values: string) => {
    form.setFieldValue("certifications", values);
  };
  const setWorkExperience = (values: string) => {
    form.setFieldValue("workExperience", values);
  };
  const setKeySkills = (values: string) => {
    form.setFieldValue("keySkills", values);
  };
  const [profileType, setProfileType] = useState(initialValues?.profileType);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      // close the modal
      handleCancel();
    }
  }, [addSuccess, editSuccess]);

  return {
    form,
    allSkills,
    skillsLoading,
    allVendors: allVendors?.data,
    allLocation: allLocation?.data,
    handleAddProfile,
    handleEditProfile,
    memoizedOnVendorSearch,
    memoizedOnLocationSearch,
    memoizedOnSkillsSearch,
    editProfileLoading,
    addProfileLoading,
    setCertifications,
    onFinish,
    options,
    setEducation,
    setOtherValue,
    setProjects,
    setKeySkills,
    setWorkExperience,
    setProfileHighlights,
    setProfileType,
    profileType,
    setIsResumeDeleted,
    editProfileMutate,
  };
};

export default useAddEditProfile;
