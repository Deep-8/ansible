import { ICompanyTable, IgetAllCompaniesPayload } from "@/interfaces/company";
import { getAllCompanies } from "@/services/company";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { Tooltip } from "antd";

const useCompanies = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [delopen, setDelOpen] = useState<boolean>(false);
  const [ID, setID] = useState<string>("");
  const { page } = router.query;
  const {
    data,
    isFetching,
    refetch: refetchAllCompanies,
  } = useQuery(["allCompanies", page], () => {
    const payload: IgetAllCompaniesPayload = {
      params: {
        include: "contacts",
        page: Number(page),
      },
    };
    return getAllCompanies(payload);
  });

  const companyDatatype = [
    {
      key: "SNo",
      title: <div className="ant-table-column-header">S. No.</div>,
      dataIndex: "SNo",
      ellipsis: true,
      width: 70,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyTable, index: number) => (
        <>
          {(data?.data?.meta.pagination.currentPage - 1) *
            data?.data?.meta.pagination.perPage +
            index +
            1 <
            10 && <span>0</span>}
          {(data?.data?.meta.pagination.currentPage - 1) *
            data?.data?.meta.pagination.perPage +
            index +
            1}
        </>
      ),
    },
    {
      key: "name",
      title: <div className="ant-table-column-header">Company Name</div>,
      dataIndex: "name",
      ellipsis: true,
      width: 210,
      render: (text: string, record: ICompanyTable, index: number) => (
        <>{text}</>
      ),
    },
    {
      key: "person",
      title: <div className="ant-table-column-header">Contact Person</div>,
      dataIndex: "person",
      ellipsis: true,
      width: 210,
      render: (text: string, record: ICompanyTable, index: Number) => (
        <>{record?.contacts[0]?.contactPerson}</>
      ),
    },
    {
      key: "email",
      title: <div className="ant-table-column-header">Email</div>,
      dataIndex: "email",
      ellipsis: true,
      width: 200,
      render: (text: string, record: ICompanyTable, index: Number) => (
        <>{record?.contacts[0]?.email}</>
      ),
    },
    {
      key: "mobile",
      title: <div className="ant-table-column-header">Phone</div>,
      dataIndex: "mobile",
      ellipsis: true,
      width: 150,
      render: (text: string, record: ICompanyTable, index: Number) => (
        <>{record?.contacts[0]?.mobile}</>
      ),
    },
    {
      title: <div className="ant-table-column-header">Action</div>,
      key: "action",
      width: 130,
      align: "center" as AlignType,
      render: (text: string, record: ICompanyTable, index: Number) => (
        <div className="flex gap-4 justify-center">
          <Tooltip title="View">
            <img
              src="/assets/view.svg"
              className="cursor-pointer"
              onClick={() => ViewFunction(record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <img
              src="/assets/bin.svg"
              className="cursor-pointer"
              onClick={() => {
                deleteAction(record.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const ViewFunction = (id: string) => {
    setID(id);
    router.push({
      pathname: `/dashboard/companies/${id}`,
      query: {
        page: 1,
      },
    });
  };

  const deleteAction = (id: string) => {
    setID(id);
    setDelOpen(true);
  };

  return {
    data,
    isFetching,
    companyDatatype,
    open,
    delopen,
    setDelOpen,
    ID,
    setOpen,
    ViewFunction,
    deleteAction,
    refetchAllCompanies,
  };
};

export default useCompanies;
