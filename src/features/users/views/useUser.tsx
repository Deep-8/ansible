import {
  TableCellHeader,
  TableRowRenderer,
} from "@/components/tableComponent/rowRenderer";
import { addUser, deleteUser, editUser, getAllUsers } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Switch, Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import useDebounce from "@/utils/useDebounce";
import { toast } from "react-toastify";
import { capitalize } from "@/utils/date";
import { role } from "@/utils/constant";
const columns = [
  {
    key: "SNo",
    title: <TableCellHeader>S. No.</TableCellHeader>,
    dataIndex: "SNo",
    // ellipsis: true,
    width: "10%",
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
    width: "20%",
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>
        {capitalize(text)}
      </TableRowRenderer>
    ),
    align: "left" as AlignType,
  },
  {
    key: "email",
    title: <TableCellHeader>Email</TableCellHeader>,
    dataIndex: "email",
    ellipsis: true,
    width: "25%",
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>
        {capitalize(text)}
      </TableRowRenderer>
    ),
    align: "left" as AlignType,
  },
  {
    key: "role",
    title: <TableCellHeader>Role</TableCellHeader>,
    dataIndex: "role",
    ellipsis: true,
    width: "15%",
    render: (text: string, record: any) => (
      <Select
        key={record.id + role[text]}
        defaultValue={{ value: text, label: role[text] }}
        style={{ width: 120 }}
        onChange={(value) => {
          record.handleRoleChange(value, record.id);
        }}
        options={[
          { value: 1, label: "Admin" },
          { value: 2, label: "Employee" },
        ]}
      />
    ),
    align: "left" as AlignType,
  },
  {
    key: "status",
    title: <TableCellHeader>Status</TableCellHeader>,
    dataIndex: "status",
    width: "10%",
    align: "center" as AlignType,
    render: (status: number, record: any) => {
      return (
        <Switch
          key={record?.id}
          onChange={(checked) => {
            record.toggleStatusChange(checked, record.id);
          }}
          defaultChecked={status === 1 ? true : false}
          checkedChildren="Available"
          unCheckedChildren="Unavailable"
        />
      );
    },
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
  name?: string;
  email?: string;
  role?: number;
  status?: number;
  // id?: string
}
const initialStateEmpty = {
  name: "",
  email: "",
  role: 1,
  status: 1,
  // id: ''
};
const useUser = () => {
  const router = useRouter();
  const { page } = router.query;
  const client = useQueryClient();
  const [q, setQ] = useState<string | undefined>();
  const [editId, setEditId] = useState("-1");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const debouncedQuery = useDebounce(q);
  const [initialState, setInitialState] =
    useState<IinitialValue>(initialStateEmpty);

  const pushPageToUrl = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1 },
    });
  };
  // get all User
  const {
    data,
    isFetching,
    refetch: refetchAllUser,
    isSuccess,
  } = useQuery(
    ["allUser", page, debouncedQuery],
    () => {
      const payload = {
        params: {
          page: Number(page),
          q: debouncedQuery ?? "",
        },
      };
      return getAllUsers(payload);
    },
    {
      retry: 1,
      enabled: router.isReady,
    }
  );
  // add a User
  const {
    isLoading: addLoading,
    mutate: addUserMutate,
    isSuccess: addSuccess,
  } = useMutation((payload: IinitialValue) => addUser(payload), {
    onSuccess: (res) => {
      if (res.success) {
        handleShowAddUserModal();
        setInitialState(initialStateEmpty);
        pushPageToUrl();
        client.invalidateQueries(["allUser"]);
        refetchAllUser();
      }
    },
    onError: (err) => {
      console.log("err on", err);
    },
  });

  // edit User
  const {
    isLoading: editLoading,
    mutate: editUserMutate,
    isSuccess: editSuccess,
  } = useMutation((payload: IinitialValue) => editUser(payload), {
    onSuccess: (res) => {
      if (res.success) {
        setEditId("-1");
        setInitialState(initialStateEmpty);
        setShowEditModal(false);
        client.invalidateQueries(["allProfiles"]);
        refetchAllUser();
      }
    },
    onError: (err) => {
      console.log("err on", err);
    },
  });
  const handleAddUser = (values: IinitialValue) => {
    if (showModal) {
      const payload = {
        name: values.name,
        email: values.email,
        role: values.role,
      };
      addUserMutate(payload);
    }
    if (showEditModal) {
      const payload = {
        id: editId,
        name: values.name,
        email: values.email,
        role: values.role,
      };
      editUserMutate(payload);
    }
  };
  const handleEditModal = (record: any) => {
    setShowEditModal(!showEditModal);
    setEditId(record?.id ?? "-1");
    setInitialState({
      name: record.name,
      email: record.email,
      role: record.role,
    });
  };
  const GetUserTableData = () => {
    const pagination = data?.meta?.pagination;
    const offset = (pagination?.currentPage - 1) * pagination?.perPage;
    const currPage = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 15;
    return data?.data?.map((User: any, index: number) => ({
      key: (currPage - 1) * perPage + index + 1,
      SNo: `${
        offset + index + 1 < 10
          ? "0" + `${offset + index + 1} `
          : offset + index + 1
      }`,
      name: User?.name,
      id: User?.id,
      email: User?.email,
      status: User?.status,
      role: User?.role,
      handleEditModal: handleEditModal,
      handleRoleChange: handleRoleChange,
      toggleStatusChange: toggleStatusChange,
      handleShowDeleteModal: handleShowDeleteModal,
    }));
  };
  const onSearch = (value: string) => {
    setQ(value);
    pushPageToUrl();
  };
  const handleShowAddUserModal = () => {
    if (showEditModal) {
      setShowEditModal(!showEditModal);
    } else {
      setShowModal(!showModal);
    }
  };
  const onDelete = () => {
    deleteUser(editId).then(() => {
      refetchAllUser();
    });
    setShowDeleteModal(!showDeleteModal);
  };
  const handleShowDeleteModal = (record: any) => {
    setShowDeleteModal(!showDeleteModal);
    setEditId(record.id ?? "-1");
  };
  const handleRoleChange = (value: number, id: string) => {
    const payload = {
      role: value,
      id: id,
    };
    editUserMutate(payload);
  };
  const toggleStatusChange = (checked: boolean, id: string) => {
    console.log("checked", checked);
    const payload = { status: checked === true ? 1 : 0, id: id };
    editUserMutate(payload);
  };
  return {
    isFetching: isFetching,
    allUser: GetUserTableData(),
    columns: columns,
    onSearch: onSearch,
    handleShowAddUserModal: handleShowAddUserModal,
    showModal,
    addLoading,
    showEditModal,
    editLoading,
    pagination: data?.meta?.pagination,
    initialValues: initialState,
    handleAddUser,
    showDeleteModal,
    onDelete,
    handleShowDeleteModal,
  };
};

export default useUser;
