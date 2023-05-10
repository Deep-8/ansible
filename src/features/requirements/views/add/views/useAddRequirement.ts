import { useEffect } from "react";
import useDebounce from "@/utils/useDebounce";
import { ISkillsPayload } from "@/interfaces/skills";
import { getAllCompanies } from "@/services/company";
import { getAllSkills } from "@/services/skills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";
import { useCallback, useState } from "react";
import { ILocationPayload } from "@/interfaces/location";
import { getAllLocation } from "@/services/location";
import { addNewRequirements, editRequirements } from "@/services/requirements";
import {
  addRequirements,
  IAddRequirementProps,
} from "@/interfaces/requirements";
import { IUserPayload } from "@/interfaces/user";
import { getAllUsers } from "@/services/user";

const useAddRequirement = ({
  handleCancel,
  refetchAllRequirement,
}: IAddRequirementProps) => {
  const client = useQueryClient();
  const [form] = Form.useForm();
  const [skillsQuery, setSkillsQuery] = useState<string>("");
  const [companyQuery, setCompanyQuery] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [assignedToQuery, setAssignedToQuery] = useState<string>("");
  const debouncedSkillsQuery = useDebounce(skillsQuery);
  const debouncedCompanyQuery = useDebounce(companyQuery);
  const debouncedLocationQuery = useDebounce(locationQuery);
  const debouncedAssignedToQuery = useDebounce(assignedToQuery);

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
  const { data: allCompanies, isFetching: allCompaniesLoading } = useQuery({
    queryKey: ["allCompanies", debouncedCompanyQuery],
    queryFn: () => {
      const payload: ISkillsPayload = {
        params: {
          paginate: false,
          // companyName: debouncedCompanyQuery
          q: debouncedCompanyQuery,
        },
      };
      return getAllCompanies(payload);
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
  // Get all users
  const { data: allUsers, isFetching: userLoading } = useQuery({
    queryKey: ["allUsers", debouncedAssignedToQuery],
    queryFn: () => {
      const userPayload: IUserPayload = {
        params: {
          q: debouncedAssignedToQuery,
          paginate: false,
        },
      };
      return getAllUsers(userPayload);
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
    isLoading: addRequirementLoading,
    mutate: addRequirementMutate,
    isSuccess: addSuccess,
  } = useMutation((payload: addRequirements) => addNewRequirements(payload), {
    onSuccess: () => {
      refetchAllRequirement();
      client.invalidateQueries(["allRequirements"]);
    },
  });

  const {
    isLoading: editRequirementLoading,
    mutate: editRequirementMutate,
    isSuccess: editSuccess,
  } = useMutation((payload: addRequirements) => editRequirements(payload), {
    onSuccess: () => {
      refetchAllRequirement();
      client.invalidateQueries(["allRequirements"]);
    },
  });

  const memoizedOnCompanySearch = useCallback((value: string) => {
    setCompanyQuery(value);
  }, []);
  const memoizedOnSkillsSearch = useCallback((value: string) => {
    setSkillsQuery(value);
  }, []);
  const memoizedOnLocationSearch = useCallback((value: string) => {
    setLocationQuery(value);
  }, []);
  const memoizedOnAssignedToSearch = useCallback((value: string) => {
    setAssignedToQuery(value);
  }, []);
  const handleAddRequirement = (values: any) => {
    addRequirementMutate({
      ...values,
      status: 1,
    });
  };
  const handleEditRequirement = (values: any) => {
    editRequirementMutate({
      ...values,
      // status: status === true ? 1 : 0,
    });
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      // close the modal
      handleCancel();
    }
  }, [addSuccess, editSuccess]);

  return {
    form,
    allSkills,
    handleAddRequirement,
    handleEditRequirement,
    memoizedOnCompanySearch,
    memoizedOnSkillsSearch,
    allLocation: allLocation?.data,
    memoizedOnLocationSearch,
    skillsLoading,
    skillsQuery,
    addRequirementLoading,
    editRequirementLoading,
    allCompanies: allCompanies?.data,
    editRequirementMutate,
    memoizedOnAssignedToSearch,
    allUsers: allUsers?.data,
    userLoading,
  };
};

export default useAddRequirement;
