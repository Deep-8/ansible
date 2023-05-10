import {
  TableCellHeader,
  TableRowRenderer,
} from "@/components/tableComponent/rowRenderer";
import { getAllSkills } from "@/services/skills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { AlignType } from "rc-table/lib/interface";
import {
  addLocation,
  deleteLocation,
  editLocation,
  getAllLocation,
} from "@/services/location";
import useDebounce from "@/utils/useDebounce";
import { capitalize } from "@/utils/date";
const columns = [
  {
    key: "SNo",
    title: <TableCellHeader>S. No.</TableCellHeader>,
    dataIndex: "SNo",
    // ellipsis: true,
    width: "40%",
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
    align: "left" as AlignType,
  },
  {
    key: "name",
    title: <TableCellHeader>Name</TableCellHeader>,
    dataIndex: "name",
    ellipsis: true,

    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>
        {capitalize(text)}
      </TableRowRenderer>
    ),
    align: "left" as AlignType,
  },

  {
    key: "action",
    title: <TableCellHeader>Action</TableCellHeader>,
    dataIndex: "action",
    width: "10%",
    align: "center" as AlignType,
    render: (_: any, record: any) => (
      <div className="flex justify-center items-center gap-x-2">
        <Tooltip title="Edit">
          <div
            className="cursor-pointer"
            onClick={() => {
              record.handleEditModal(record);
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/edit.svg" />
          </div>
        </Tooltip>
        <Tooltip title="Delete">
          <div
            className="cursor-pointer"
            onClick={() => {
              record.handleShowDeleteModal(record);
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/bin.svg" />
          </div>
        </Tooltip>
      </div>
    ),
  },
];

interface IinitialValue {
  name: string;
}
const useLocation = () => {
  const router = useRouter();
  const { page } = router.query;
  const client = useQueryClient();
  const [q, setQ] = useState<string | undefined>();
  const [editId, setEditId] = useState("-1");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const debouncedQuery = useDebounce(q);
  const [initialState, setInitialState] = useState<IinitialValue>({ name: "" });
  const pushPageToUrl = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1 },
    });
  };
  // get all location
  const {
    data,
    isFetching,
    refetch: refetchAllLocation,
    isSuccess,
  } = useQuery(
    ["allLocation", page, debouncedQuery],
    () => {
      const payload = {
        params: {
          page: Number(page),
          q: debouncedQuery,
        },
      };

      return getAllLocation(payload);
    },
    {
      retry: 1,
      enabled: router.isReady,
    }
  );

  // add a skills
  const {
    isLoading: addLoading,
    mutate: addLocationMutate,
    isSuccess: addSuccess,
  } = useMutation((payload: IinitialValue) => addLocation(payload), {
    onSuccess: (res) => {
      if (res.success) {
        handleShowAddLocationModal();
        setInitialState({
          name: "",
        });
        pushPageToUrl();
        client.invalidateQueries(["allProfiles"]);
        refetchAllLocation();
      }
    },
    onError: (err) => {},
  });

  // edit skills
  const {
    isLoading: editLoading,
    mutate: editLocationMutate,
    isSuccess: editSuccess,
  } = useMutation((payload: IinitialValue) => editLocation(payload), {
    onSuccess: (res) => {
      if (res.success) {
        setEditId("-1");
        setInitialState({
          name: "",
        });
        setShowEditModal(false);
        client.invalidateQueries(["allProfiles"]);
        refetchAllLocation();
      }
    },
    onError: (err) => {
      console.log("err on", err);
    },
  });

  const GetLocationTableData = () => {
    const pagination = data?.meta?.pagination;
    const offset = (pagination?.currentPage - 1) * pagination?.perPage;
    const currPage = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 15;
    return data?.data?.map((location: any, index: number) => ({
      key: (currPage - 1) * perPage + index + 1,
      SNo: `${
        offset + index + 1 < 10
          ? "0" + `${offset + index + 1} `
          : offset + index + 1
      }`,
      name: location?.name,
      id: location.id,
      handleEditModal: handleEditModal,
      handleShowDeleteModal: handleShowDeleteModal,
    }));
  };
  const handleEditModal = (record: any) => {
    setShowEditModal(!showEditModal);
    setEditId(record?.id ?? "-1");
    setInitialState({
      name: record.name,
    });
  };
  const handleShowDeleteModal = (record: any) => {
    setShowDeleteModal(!showDeleteModal);
    setEditId(record.id ?? "-1");
  };
  const onDelete = () => {
    deleteLocation(editId).then(() => {
      refetchAllLocation();
    });
    setShowDeleteModal(!showDeleteModal);
  };
  const handleShowAddLocationModal = () => {
    if (showEditModal) {
      setShowEditModal(!showEditModal);
    } else {
      setShowModal(!showModal);
    }
  };
  const handleAddLocation = (values: IinitialValue) => {
    if (showModal) {
      const payload = { name: values.name };
      addLocationMutate(payload);
    }
    if (showEditModal) {
      const payload = {
        id: editId,
        name: values.name,
      };
      editLocationMutate(payload);
    }
  };
  const onSearch = (value: string) => {
    setQ(value);
    pushPageToUrl();
  };
  return {
    isFetching: isFetching,
    allLocation: GetLocationTableData(),
    columns: columns,
    pagination: data?.meta?.pagination,
    showDeleteModal,
    onDelete,
    handleShowAddLocationModal,
    handleShowDeleteModal,
    showModal,
    addLoading,
    showEditModal,
    editLoading,
    handleAddLocation,
    onSearch,
    initialValues: initialState,
  };
};

export default useLocation;
