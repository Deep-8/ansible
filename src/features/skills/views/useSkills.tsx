import {
  TableCellHeader,
  TableRowRenderer,
} from "@/components/tableComponent/rowRenderer";
import {
  addSkill,
  deleteSkill,
  editSkill,
  getAllSkills,
} from "@/services/skills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { AlignType } from "rc-table/lib/interface";
import useDebounce from "@/utils/useDebounce";
import { toast } from "react-toastify";
import { capitalize } from "@/utils/date";
const columns = [
  {
    key: "SNo",
    title: <TableCellHeader>S. No.</TableCellHeader>,
    dataIndex: "SNo",
    // ellipsis: true,
    width: "40%",
    align: "left" as AlignType,
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
  },
  {
    key: "name",
    title: <TableCellHeader>Name</TableCellHeader>,
    dataIndex: "name",
    ellipsis: true,
    align: "left" as AlignType,
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>
        {capitalize(text)}
      </TableRowRenderer>
    ),
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
const useSkills = () => {
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
  // get all skills
  const {
    data,
    isFetching,
    refetch: refetchAllSkills,
    isSuccess,
  } = useQuery(
    ["allSkills", page, debouncedQuery],
    () => {
      const payload = {
        params: {
          page: Number(page),
          q: debouncedQuery ?? "",
        },
      };
      return getAllSkills(payload);
    },
    {
      retry: 1,
      enabled: router.isReady,
    }
  );
  // add a skills
  const {
    isLoading: addLoading,
    mutate: addSkillMutate,
    isSuccess: addSuccess,
  } = useMutation((payload: IinitialValue) => addSkill(payload), {
    onSuccess: (res) => {
      if (res.success) {
        handleShowAddSkillsModal();
        setInitialState({
          name: "",
        });
        pushPageToUrl();
        client.invalidateQueries(["allProfiles"]);
        refetchAllSkills();
      }
    },
    onError: (err) => {
      console.log("err on", err);
    },
  });

  // edit skills
  const {
    isLoading: editLoading,
    mutate: editSkillMutate,
    isSuccess: editSuccess,
  } = useMutation((payload: IinitialValue) => editSkill(payload), {
    onSuccess: (res) => {
      if (res.success) {
        setEditId("-1");
        setInitialState({
          name: "",
        });
        setShowEditModal(false);
        client.invalidateQueries(["allProfiles"]);
        refetchAllSkills();
      }
    },
    onError: (err) => {
      console.log("err on", err);
    },
  });
  const handleAddSkill = (values: IinitialValue) => {
    if (showModal) {
      const payload = { name: values.name };
      addSkillMutate(payload);
    }
    if (showEditModal) {
      const payload = {
        id: editId,
        name: values.name,
      };
      editSkillMutate(payload);
    }
  };
  const handleEditModal = (record: any) => {
    setShowEditModal(!showEditModal);
    setEditId(record?.id ?? "-1");
    setInitialState({
      name: record.name,
    });
  };
  const GetSkillsTableData = () => {
    const pagination = data?.meta?.pagination;
    const offset = (pagination?.currentPage - 1) * pagination?.perPage;
    const currPage = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 15;
    return data?.data?.map((skill: any, index: number) => ({
      key: (currPage - 1) * perPage + index + 1,
      SNo: `${
        offset + index + 1 < 10
          ? "0" + `${offset + index + 1} `
          : offset + index + 1
      }`,
      name: skill?.name,
      id: skill?.id,
      handleEditModal: handleEditModal,
      handleShowDeleteModal: handleShowDeleteModal,
    }));
  };

  const onSearch = (value: string) => {
    setQ(value);
    pushPageToUrl();
  };
  const handleShowAddSkillsModal = () => {
    if (showEditModal) {
      setShowEditModal(!showEditModal);
    } else {
      setShowModal(!showModal);
    }
  };

  const onDelete = () => {
    deleteSkill(editId).then(() => {
      refetchAllSkills();
    });
    setShowDeleteModal(!showDeleteModal);
  };
  const handleShowDeleteModal = (record: any) => {
    setShowDeleteModal(!showDeleteModal);
    setEditId(record.id ?? "-1");
  };
  return {
    isFetching: isFetching,
    allSkills: GetSkillsTableData(),
    columns: columns,
    onSearch: onSearch,
    handleShowAddSkillsModal: handleShowAddSkillsModal,
    showModal,
    addLoading,
    showEditModal,
    editLoading,
    pagination: data?.meta?.pagination,
    initialValues: initialState,
    handleAddSkill,
    showDeleteModal,
    onDelete,
    handleShowDeleteModal,
  };
};

export default useSkills;
