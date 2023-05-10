import { getVendorDetails, getVendorProfiles } from "@/services/vendors";
import { dateGenerator } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { IVendorTable } from "@/interfaces/vendor";

const useVendorInnerPage = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [updatedDate, setUpdatedDate] = useState<string>("");
  const { vendorId } = router.query;
  const { page } = router.query;

  const {
    data: listingData,
    isFetching: vendorListLoading,
    refetch,
  } = useQuery(
    ["vendorProfiles", vendorId, page],
    () => {
      return getVendorProfiles(vendorId as string, Number(page));
    },
    {
      enabled: !!vendorId,
      retry: 1,
    }
  );

  const { data: cardData, isLoading: cardLoading } = useQuery(
    ["vendorDetails", vendorId],
    () => {
      return getVendorDetails(vendorId as string);
    },
    {
      enabled: !!vendorId,
      retry: 1,
    }
  );
  useEffect(() => {
    refetch();
  }, [pageNumber]);
  useEffect(() => {
    setDate(dateGenerator(cardData?.data.data.createdAt));
    setUpdatedDate(dateGenerator(cardData?.data.data.updatedAt));
  }, [cardData]);
  const companyDatatype = [
    {
      key: "SNo",
      title: <div className="ant-table-column-header">S. sNo.</div>,
      dataIndex: "SNo",
      ellipsis: true,
      align: "center" as AlignType,
      width: 70,
      render: (text: string, record: IVendorTable, index: number) => (
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
      key: "name",
      title: <div className="ant-table-column-header">Name</div>,
      dataIndex: "name",
      ellipsis: true,
      width: 120,
      align: "center" as AlignType,
      render: (text: string, record: IVendorTable, index: number) => (
        <>{record.name}</>
      ),
    },
    {
      key: "skills",
      title: <div className="ant-table-column-header">Skills</div>,
      dataIndex: "skills",
      align: "center" as AlignType,
      ellipsis: true,
      width: 120,
      render: (text: string, record: IVendorTable, index: number) => (
        <>{record.skills[0].name}</>
      ),
    },
    {
      key: "exp",
      title: <div className="ant-table-column-header">Experience</div>,
      dataIndex: "exp",
      width: 120,
      ellipsis: true,
      align: "center" as AlignType,
      render: (text: string, record: IVendorTable, index: number) => (
        <>{record.experience} Years</>
      ),
    },

    {
      key: "location",
      title: <div className="ant-table-column-header">Location / Remote</div>,
      dataIndex: "location",
      width: 120,
      align: "center" as AlignType,
      render: (text: string, record: IVendorTable, index: number) => (
        <>{record.locations[0].name}</>
      ),
    },
    {
      key: "budget",
      title: <div className="ant-table-column-header">Cost</div>,
      dataIndex: "budget",
      width: 110,
      ellipsis: true,
      render: (text: string, record: IVendorTable, index: number) => (
        <>₹ {record.costInr}</>
      ),
    },
    {
      key: "cv",
      title: <div className="ant-table-column-header">Cv / Resume</div>,
      dataIndex: "cv",
      width: 85,
      align: "center" as AlignType,
      render: (text: string, record: IVendorTable, index: number) => (
        <a href={record.cvSlug} className="underline text-page">
          {" "}
          View
        </a>
      ),
    },
    {
      key: "status",
      title: <div className="ant-table-column-header">Status</div>,
      dataIndex: "status",
      ellipsis: true,
      align: "center" as AlignType,
      width: 90,
      render: (text: string, record: IVendorTable, index: number) => (
        <div className="flex justify-center">
          {record.status == 1 && (
            <div className="bg-green rounded-xl px-4 w-fit text-white">
              Available
            </div>
          )}
          {record.status == 0 && (
            <div className="bg-grey-med rounded-xl px-4 w-fit text-grey">
              Unavailable
            </div>
          )}
        </div>
      ),
    },

    {
      title: <div className="ant-table-column-header">Action</div>,
      key: "action",
      align: "center" as AlignType,
      width: 170,
      render: (text: string, record: IVendorTable, index: number) => (
        <div className="flex gap-2 justify-center">
          <img src="/assets/edit.svg" className="cursor-pointer" />

          <img src="/assets/bin.svg" className="cursor-pointer" />
          <img src="/assets/match.svg" className="cursor-pointer" />
        </div>
      ),
    },
  ];

  return {
    listingData: listingData,
    cardLoading,
    cardData,
    vendorListLoading,
    companyDatatype,
    setPageNumber,
    date,
    vendorId,
    updatedDate,
  };
};

export default useVendorInnerPage;
