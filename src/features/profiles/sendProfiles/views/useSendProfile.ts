import { ISkillsPayload } from "@/interfaces/skills";
import { getAllCompanies, sendProfiles } from "@/services/company";
import useDebounce from "@/utils/useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useSendProfile = ({
  handleSendProfileOk,
}: {
  handleSendProfileOk: () => void;
}) => {
  const [form] = Form.useForm();
  const [companyQuery, setCompanyQuery] = useState<string>("");
  const [companyContacts, setCompanyContacts] = useState<Array<any>>([]);
  const debouncedCompanyQuery = useDebounce(companyQuery);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const { data: allCompanies, isFetching: allCompaniesLoading } = useQuery({
    queryKey: ["allCompanies", debouncedCompanyQuery],
    queryFn: () => {
      const payload: ISkillsPayload = {
        params: {
          include: "contacts",
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
          contacts: each.contacts.map((contact: any) => ({
            ...contact,
            value: contact.email,
            label: contact.email,
          })),
        })),
      };
    },
  });
  const memoizedOnCompanySearch = useCallback((value: string) => {
    setCompanyQuery(value);
  }, []);

  // sendProfiles

  const {
    isLoading: sendProfilesLoading,
    mutate: sendProfilesMutate,
    isSuccess: addSuccess,
  } = useMutation((payload: any) => sendProfiles(payload), {
    onSuccess: () => {
      toast.success("Profile send Successfully");
      handleSendProfileOk();
    },
  });

  const handleSendProfilesMutate = (values: any) => {
    const filteredEmails = values.email.filter(
      (each: any) => each !== values.selectedCompanyEmail
    );
    const payload = {
      id: values.companyId,
      params: {
        profiles: values.profiles,
        senders: filteredEmails,
      },
    };

    sendProfilesMutate(payload);
  };

  return {
    allCompanies: allCompanies?.data ?? [],
    memoizedOnCompanySearch,
    form,
    sendProfilesLoading,
    setCompanyContacts,
    companyContacts,
    handleSendProfilesMutate,
    setIsFilled,
  };
};

export default useSendProfile;
