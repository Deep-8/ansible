import { getAllVendors } from "@/services/vendors";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { ICompanyTable, IContacts } from "@/interfaces/company";
import { Tooltip } from "antd";
import { IVendorFilter, IVendorPayload } from "@/interfaces/vendor";
import useDebounce from "@/utils/useDebounce";
import { ISkillsPayload } from "@/interfaces/skills";
import { getAllSkills } from "@/services/skills";
import { ILocationPayload } from "@/interfaces/location";
import { getAllLocation } from "@/services/location";
import { TableRowRenderer } from "@/components/tableComponent/rowRenderer";

const useVendors = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [delopen, setDelOpen] = useState<boolean>(false);
  const [ID, setID] = useState<string>("");
  const [q, setQ] = useState<string | undefined>();
  const debouncedQuery = useDebounce(q);
  const { page } = router.query;
  const [filter, setFilter] = useState<IVendorFilter>({
    page: Number(page) ?? 1,
    skills: "",
    locations: "",
  });

  const [skillsQuery, setSkillsQuery] = useState<string>("");
  const debouncedSkillsQuery = useDebounce(skillsQuery);

  const [locationQuery, setLocationQuery] = useState<string>("");
  const debouncedLocationQuery = useDebounce(locationQuery);

  const {
    data: vendors,
    isFetching,
    refetch: refetchAllVendors,
    isSuccess,
  } = useQuery(["allVendors", filter, debouncedQuery], () => {
    const vendorPayload: IVendorPayload = {
      params: {
        include: "locations,skills,contacts",
        q: debouncedQuery ?? "",
        ...filter,
      },
    };

    return getAllVendors(vendorPayload);
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
  const { data: location, isFetching: locationLoading } = useQuery({
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

  const companyDatatype = [
    {
      key: "SNo",
      title: <div className="ant-table-column-header">S. No.</div>,
      dataIndex: "SNo",
      ellipsis: true,
      width: 70,
      align: "center" as AlignType,
      render: (text: string, record: any) => (
        <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
      ),
    },
    {
      key: "name",
      title: <div className="ant-table-column-header">Vendor Name</div>,
      dataIndex: "name",
      ellipsis: true,
      width: 210,
      render: (name: string, record: any) => (
        <TableRowRenderer>
          <span className="capitalize">{name}</span>
        </TableRowRenderer>
      ),
    },
    {
      key: "person",
      title: <div className="ant-table-column-header">Contact Person</div>,
      dataIndex: "person",
      ellipsis: true,
      width: 210,
      render: (contacts: IContacts, record: any) => (
        <TableRowRenderer>
          <span className="capitalize">
            {record.contacts[0]?.contactPerson}
          </span>
        </TableRowRenderer>
      ),
    },
    {
      key: "email",
      title: <div className="ant-table-column-header">Email</div>,
      dataIndex: "email",
      ellipsis: true,
      width: 200,
      render: (contacts: IContacts, record: any) => (
        <>{record.contacts[0]?.email}</>
      ),
    },
    {
      key: "mobile",
      title: <div className="ant-table-column-header">Phone</div>,
      dataIndex: "mobile",
      ellipsis: true,
      width: 150,
      render: (contacts: any, record: ICompanyTable) => (
        <>{record.contacts[0]?.mobile}</>
      ),
    },
    {
      title: <div className="ant-table-column-header">Action</div>,
      key: "action",
      width: 130,
      align: "center" as AlignType,
      render: (_: any, record: any) => (
        <div className="flex gap-4 justify-center">
          <Tooltip title="View">
            <img
              src="/assets/view.svg"
              className="cursor-pointer"
              onClick={() => {
                record?.ViewFunction(record?.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <img
              src="/assets/bin.svg"
              className="cursor-pointer"
              onClick={() => {
                record?.deleteAction(record?.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const onSearch = (value: string) => {
    setQ(value);
    setFilter((prev) => ({ ...prev, page: 1 }));
    pushPageToUrl();
  };
  const memoizedOnSkillSearch = useCallback((value: string) => {
    setSkillsQuery(value);
  }, []);
  const memoizedOnLocationSearch = useCallback((value: string) => {
    setLocationQuery(value);
  }, []);
  const ViewFunction = (id: string) => {
    setID(id);

    router.push({
      pathname: `/dashboard/vendors/${id}`,
      query: {
        page: 1,
      },
    });
  };

  const deleteAction = (id: string) => {
    setID(id);
    setDelOpen(true);
  };

  const pushPageToUrl = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1 },
    });
  };
  const handleSelectSkills = (skills: Array<string>) => {
    setFilter((prev) => ({ ...prev, skills: skills.join(","), page: 1 }));
    pushPageToUrl();
  };
  const handleSelectLocation = (locations: Array<string>) => {
    setFilter((prev) => ({ ...prev, locations: locations.join(","), page: 1 }));
    pushPageToUrl();
  };
  useEffect(() => {
    setFilter((prev) => ({ ...prev, page: Number(page) }));
  }, [page]);
  const GetRequirementsTableData = () => {
    const pagination = vendors?.meta?.pagination;
    const offset = (pagination?.currentPage - 1) * pagination?.perPage;
    const currPage = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 15;
    return vendors?.data?.map((vendor: any, index: number) => ({
      key: (currPage - 1) * perPage + index + 1,
      SNo: `${
        offset + index + 1 < 10
          ? "0" + `${offset + index + 1} `
          : offset + index + 1
      }`,
      id: vendor.id,
      name: vendor.name,
      contacts: vendor.contacts,
      ViewFunction,
      deleteAction,
    }));
  };

  return {
    vendors: GetRequirementsTableData(),
    pagination: vendors?.meta?.pagination,
    isFetching,
    companyDatatype,
    open,
    delopen,
    setDelOpen,
    ID,
    setOpen,
    ViewFunction,
    deleteAction,
    refetchAllVendors,
    handleSelectSkills,
    memoizedOnSkillSearch,
    allSkills: allSkills?.data ?? [],
    onSearch,
    location: location?.data ?? [],
    memoizedOnLocationSearch,
    handleSelectLocation,
  };
};

export default useVendors;
