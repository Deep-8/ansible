import { ICompanyRequirements } from "@/interfaces/company";
import { getCompanyDetails, getCompanyRequirements } from "@/services/company";
import { dateGenerator } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCompanies from "../../views/useCompanies";
import { AlignType } from "rc-table/lib/interface";

const useCompanyInnerPage = (isSuccess: boolean) => {
  const [delopen, setDelOpen] = useState<boolean>(false);
  const [ID, setID] = useState<string>("");
  const [cardDelete, setCardDelete] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [updatedDate, setUpdatedDate] = useState<string>("");
  const { open, setOpen } = useCompanies();
  const [totalRequirements, setTotalRequirements] = useState<number>(0);

  const deleteAction = (id: string) => {
    setID(id);
    setDelOpen(true);
    setCardDelete(true);
  };
  const editAction = (id: string) => {
    setID(id);
    setOpen(true);
  };

  const router = useRouter();
  const { companyId } = router.query;
  const { page } = router.query;

  const { data: listingData, isFetching: companyListLoading } = useQuery(
    ["companyRequirements", companyId, page],
    () => {
      return getCompanyRequirements(companyId as string, Number(page));
    },
    {
      enabled: !!companyId,
      retry: 1,
    }
  );

  const { data: cardData, isLoading: cardLoading } = useQuery(
    ["companyDetails", companyId],
    () => {
      return getCompanyDetails(companyId as string);
    },
    {
      enabled: !!companyId,
      retry: 1,
    }
  );
  useEffect(() => {
    setTotalRequirements(listingData?.data?.meta?.pagination?.total);
  }, [listingData]);

  useEffect(() => {
    if (isSuccess) {
      setDelOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    setDate(dateGenerator(cardData?.data.data.createdAt));
    setUpdatedDate(dateGenerator(cardData?.data.data.updatedAt));
  }, [cardData]);

  const companyDatatype = [
    {
      key: "SNo",
      title: <div className="ant-table-column-header">S. No.</div>,
      dataIndex: "SNo",
      ellipsis: true,
      width: 70,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>
          {(listingData?.data?.meta.pagination.currentPage - 1) *
            listingData?.data?.meta.pagination.perPage +
            index +
            1 <
            10 && <span>0</span>}
          {(listingData?.data?.meta.pagination.currentPage - 1) *
            listingData?.data?.meta.pagination.perPage +
            index +
            1}
        </>
      ),
    },
    {
      key: "skills",
      title: <div className="ant-table-column-header">Skills</div>,
      dataIndex: "skills",
      ellipsis: true,
      width: 140,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>{record.skills[0].name}</>
      ),
    },
    {
      key: "exp",
      title: <div className="ant-table-column-header">Experience Range</div>,
      dataIndex: "exp",
      width: 110,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>
          {record.maxExperience}-{record.maxExperience} Years
        </>
      ),
    },
    {
      key: "dev",
      title: <div className="ant-table-column-header">Number of Profiles</div>,
      dataIndex: "dev",
      width: 120,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>{record.noOfDevelopers}</>
      ),
    },
    {
      key: "location",
      title: <div className="ant-table-column-header">Location / Remote</div>,
      dataIndex: "location",
      width: 100,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>{record.locations[0].name}</>
      ),
    },
    {
      key: "budget",
      title: <div className="ant-table-column-header">Budget</div>,
      dataIndex: "budget",
      width: 130,
      ellipsis: true,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>₹{record.budgetInr}/mo</>
      ),
    },
    {
      key: "duration",
      title: <div className="ant-table-column-header">Duration</div>,
      dataIndex: "duration",
      width: 100,
      ellipsis: true,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <>{record.durationInMonths} months</>
      ),
    },
    {
      key: "status",
      title: <div className="ant-table-column-header">Status</div>,
      dataIndex: "status",
      ellipsis: true,
      width: 90,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <div className="flex justify-center">
          {record.status == 1 && (
            <div className="bg-green rounded-xl  md:px-4 md:w-fit text-white">
              Active
            </div>
          )}
          {record.status == 0 && (
            <div className="bg-grey-med rounded-xl px-4 w-fit text-grey">
              Inactive
            </div>
          )}
        </div>
      ),
    },

    {
      title: <div className="ant-table-column-header">Action</div>,
      key: "action",
      width: 160,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyRequirements, index: number) => (
        <div className="flex gap-2 justify-center">
          <img src="/assets/edit.svg" className="cursor-pointer" />
          <img src="/assets/bin.svg" className="cursor-pointer" />
          <img src="/assets/match.svg" className="cursor-pointer" />
        </div>
      ),
    },
  ];

  return {
    listingData,
    cardLoading,
    cardData,
    companyListLoading,
    companyDatatype,
    companyId,
    deleteAction,
    editAction,
    ID,
    setOpen,
    setDelOpen,
    cardDelete,
    delopen,
    open,
    date,
    updatedDate,
    totalRequirements,
  };
};

export default useCompanyInnerPage;
