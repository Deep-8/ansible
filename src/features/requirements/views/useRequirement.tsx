import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequirement,
  editRequirements,
  getAllRequirements,
} from "../../../services/requirements";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  IcompanyName,
  Ilocation,
  IMatchScore,
  IrequirementPayload,
  Iskills,
  ITableCellHeader,
} from "../../../interfaces/requirements";
import { Switch, Tooltip } from "antd";
import Image from "next/image";
import { getAllLocation } from "@/services/location";
import { ILocationPayload } from "@/interfaces/location";
import useDebounce from "@/utils/useDebounce";
import { addRequirements, IFilter } from "@/interfaces/requirements";

import { AlignType } from "rc-table/lib/interface";
import {
  TableCellHeader,
  TableRowRenderer,
} from "@/components/tableComponent/rowRenderer";
import useBeforeUnload from "@/utils/useBeforeUnload";
import { ISkillsPayload } from "@/interfaces/skills";
import { getAllSkills } from "@/services/skills";
import useAddRequirement from "./add/views/useAddRequirement";
import { toast } from "react-toastify";
import { getAllUsers } from "@/services/user";
import { dateGenerator } from "@/utils/date";

const getStatusText: any = {
  0: {
    name: "Inactive",
  },
  1: {
    name: "Active",
  },
};

const columns = [
  {
    key: "SNo",
    title: <TableCellHeader>S. No.</TableCellHeader>,
    dataIndex: "SNo",
    // ellipsis: true,
    width: "4.5rem",
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
    align: "center" as AlignType,
  },

  {
    key: "company",
    title: <TableCellHeader>Company Name</TableCellHeader>,
    dataIndex: "company",
    ellipsis: true,
    width: "10rem",
    render: (company: IcompanyName, tags: any) => (
      <TableRowRenderer colorClass="text-page" status={tags?.status}>
        <Tooltip title={company.name}>
          <div
            className="underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
            onClick={() =>
              tags.router.push(`/dashboard/companies/${company.id}`)
            }
          >
            {company.name}
          </div>
        </Tooltip>
      </TableRowRenderer>
    ),
  },
  {
    key: "skills",
    title: <TableCellHeader>Skills</TableCellHeader>,
    dataIndex: "skills",
    ellipsis: true,
    width: "13rem",
    render: (skills: Iskills[], record: any) => (
      <TableRowRenderer status={record?.status}>
        <Tooltip
          title={
            <Fragment>
              {skills.map((each, index) => (
                <span key={each.id}>
                  {each.name}
                  {index != skills.length - 1 && ", "}
                </span>
              ))}
            </Fragment>
          }
        >
          <div className=" text-ellipsis overflow-hidden whitespace-nowrap">
            {skills.map((each, index) => (
              <span key={each.id}>
                {each.name}
                {index != skills.length - 1 && ", "}{" "}
              </span>
            ))}
          </div>
        </Tooltip>
      </TableRowRenderer>
    ),
  },
  {
    key: "experienceRange",
    title: <TableCellHeader>Experience Range</TableCellHeader>,
    dataIndex: "experienceRange",
    // ellipsis: true,
    align: "center" as AlignType,

    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
    width: "7rem",
  },
  {
    key: "numberOfDevelopers",
    title: <TableCellHeader>Number Of Profiles</TableCellHeader>,
    dataIndex: "numberOfDevelopers",
    // ellipsis: true,
    align: "center" as AlignType,
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
    width: "7rem",
  },
  {
    key: "location",
    title: <TableCellHeader>Location / Remote</TableCellHeader>,
    dataIndex: "location",
    width: "10rem",
    ellipses: true,
    render: (location: Ilocation[], record: any) => (
      <TableRowRenderer status={record?.status}>
        <Tooltip
          title={
            <Fragment>
              {location.map((each, index) => (
                <span key={each.id}>
                  {each.name}
                  {index != location.length - 1 && ", "}
                </span>
              ))}
            </Fragment>
          }
        >
          <div className=" text-ellipsis overflow-hidden whitespace-nowrap">
            {location?.map((each, index) => (
              <span key={each.id}>
                {each.name}
                {index != location.length - 1 && ", "}
              </span>
            ))}
          </div>
        </Tooltip>
      </TableRowRenderer>
    ),
  },
  {
    key: "budgetInr",
    title: <TableCellHeader>Budget (per month)</TableCellHeader>,
    dataIndex: "budgetInr",
    width: "8rem",
    render: (budgetInr: number, record: any) => (
      <TableRowRenderer status={record?.status}>
        <Tooltip title={`₹ ${budgetInr}`}>
          <span className=" text-ellipsis overflow-hidden whitespace-nowrap">
            ₹ {budgetInr}
          </span>
        </Tooltip>
      </TableRowRenderer>
    ),
  },
  {
    key: "duration",
    title: <TableCellHeader>Duration</TableCellHeader>,
    dataIndex: "duration",
    ellipsis: true,
    width: "6rem",
    align: "center" as AlignType,
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
  },
  {
    key: "matchScore",
    title: <TableCellHeader>Match Score</TableCellHeader>,
    dataIndex: "matchScore",
    ellipsis: true,
    align: "center" as AlignType,
    width: "6rem",
    render: (matchScore: IMatchScore) => (
      <div className="flex justify-center">
        <Tooltip
          title={
            <Fragment>
              <div>Skill: {matchScore?.breakdown?.skill}%</div>
              <div>Location: {matchScore?.breakdown?.location}%</div>
              <div> Exp: {matchScore?.breakdown?.experience}%</div>
              <div>Cost: {matchScore?.breakdown?.cost}%</div>
            </Fragment>
          }
        >
          <div
            className={` font-bold ${
              matchScore?.total >= 70
                ? "text-green"
                : `${matchScore?.total <= 30 ? "text-red" : "text-yellow"} `
            }  `}
          >
            {matchScore?.total}%
          </div>
        </Tooltip>
      </div>
    ),
  },
  {
    key: "status",
    title: <TableCellHeader>Status</TableCellHeader>,
    dataIndex: "status",
    width: "8rem",
    align: "center" as AlignType,
    render: (status: number, record: any) => (
      <Fragment>
        <Switch
          key={record?.id}
          onChange={(checked) => {
            record.toggleChange(checked, record.id);
          }}
          defaultChecked={status === 1 ? true : false}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      </Fragment>
    ),
  },
  {
    key: "action",
    title: <TableCellHeader>Action</TableCellHeader>,
    dataIndex: "action",
    width: "13rem",
    align: "center" as AlignType,
    render: (_: any, record: any) => (
      <div className="flex justify-center items-center gap-x-2">
        <Tooltip title="View">
          <div
            className="cursor-pointer"
            onClick={() => {
              record.showViewRequirementModal(record.id);
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/view.svg" />
          </div>
        </Tooltip>
        <Tooltip title="Edit">
          <div
            className="cursor-pointer"
            onClick={() => {
              record.showEditRequirementModal(record);
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/edit.svg" />
          </div>
        </Tooltip>
        <Tooltip title="Delete">
          <div
            className="cursor-pointer"
            onClick={() => {
              record.showDeleteModal(record.id);
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/bin.svg" />
          </div>
        </Tooltip>
        <Tooltip title="Match Profiles">
          <div
            className="cursor-pointer"
            onClick={() => {
              if (record.status === 0) {
                toast.warning("This Requirement is Inactive ");
              } else {
                record.matchProfiles(record.id);
              }
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/match.svg" />
          </div>
        </Tooltip>
      </div>
    ),
  },
  {
    key: "matchAction",
    title: <TableCellHeader>Action</TableCellHeader>,
    dataIndex: "matchAction",
    width: 100,
    align: "center" as AlignType,
    render: (_: any, record: any) => (
      <div className="flex justify-center items-center gap-x-2">
        <div
          className="cursor-pointer"
          onClick={() => {
            record.showEditRequirementModal(record);
          }}
        >
          <Image alt="" width={35} height={35} src="/assets/edit.svg" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            record.showDeleteModal(record.id);
          }}
        >
          <Image alt="" width={35} height={35} src="/assets/bin.svg" />
        </div>
      </div>
    ),
  },
];

const initialValuesObject = {
  companyId: "",
  minExperience: 0,
  maxExperience: 0,
  noOfDevelopers: 0,
  budgetInr: 0,
  locations: [],
  durationInMonths: 0,
  skills: [],
  status: true,
  assignedTo: "",
};
const useRequirement = () => {
  const router = useRouter();
  const { page, profileId, companyId } = router.query;
  const [isFilled, SetIsfilled] = useState(false);
  const [sliderDev, setSliderDev] = useState<any>(1);
  const [sliderSetDev, setIsSliderSetDev] = useState<boolean>(false);
  const [sliderSetDuration, setIsSliderSetDuration] = useState<boolean>(false);
  const [sliderDuration, setSliderDuration] = useState<any>(1);
  const [isSliderSet, setIsSliderSet] = useState<boolean>(false);
  const [isBudgetSliderSet, setIsBudgetSliderSet] = useState<boolean>(false);
  const [slider, setSlider] = useState<any>([0, 100]);
  const [sliderBudget, setSliderBudget] = useState<any>([0, 20000000]);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const debouncedLocationQuery = useDebounce(locationQuery);
  const [filter, setFilter] = useState<IFilter>({
    minExperience: null,
    maxExperience: null,
    minBugetInr: null,
    maxBudgetInr: null,
    durationInMonths: null,
    noOfDevelopers: null,
    page: Number(page) ?? 1,
    skills: "",
    locations: "",
    assignedToIds: "",
  });
  const [isAddRequirementModalOpen, setIsAddRequirementModalOpen] =
    useState(false);
  const [isEditRequirementModalOpen, setIsEditRequirementModalOpen] =
    useState(false);
  const [isDeleteRequirementModalOpen, setIsDeleteRequirementModalOpen] =
    useState(false);
  const [idToDeleteRequirement, setIdToDeleteRequirement] = useState<string>();
  const [q, setQ] = useState<string | undefined>();
  const debouncedQuery = useDebounce(q);
  const [editRequirementData, setEditRequirementData] =
    useState<addRequirements>(initialValuesObject);
  const [isViewModalOpen, setIsViewRequirementModalOpen] = useState(false);
  const [viewData, setViewData] = useState<any>("");

  const [status, setStatus] = useState<boolean>(
    editRequirementData?.status === true ? true : false
  );
  const [skillsQuery, setSkillsQuery] = useState<string>("");
  const debouncedSkillsQuery = useDebounce(skillsQuery);

  const [usersQuery, setUsersQuery] = useState<string>("");
  const debouncedUsersQuery = useDebounce(usersQuery);

  const {
    data: requirements,
    isFetching: requirementLoading,
    refetch: refetchAllRequirement,
  } = useQuery(["allRequirements", filter, debouncedQuery, profileId], () => {
    const requirementPayload: IrequirementPayload = {
      params: {
        include: "locations,skills,company,matchScore,assignedTo",
        profileId: profileId as string,
        companyId: companyId as string,
        q: debouncedQuery ?? "",
        ...filter,
      },
    };

    return getAllRequirements(requirementPayload);
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
  const { data: allUsers, isFetching: usersLoading } = useQuery({
    queryKey: ["allusers", debouncedUsersQuery],
    queryFn: () => {
      const usersPayload: ISkillsPayload = {
        params: {
          paginate: false,
          q: debouncedUsersQuery,
        },
      };
      return getAllUsers(usersPayload);
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
    mutate: deleteRequirementByID,
    isSuccess,
    isLoading: loadingRequirement,
  } = useMutation(() => deleteRequirement(idToDeleteRequirement!), {
    onSuccess: (data) => {
      setIdToDeleteRequirement("");
      setIsDeleteRequirementModalOpen(false);
      toast.success(data.message);
      refetchAllRequirement();
    },
    onError: (error) => {},
  });

  const pushPageToUrl = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1, profileId: profileId },
    });
  };

  const onSearch = (value: string) => {
    setQ(value);
    setFilter((prev) => ({ ...prev, page: 1 }));
    pushPageToUrl();
  };

  const memoizedOnLocationSearch = useCallback((value: string) => {
    setLocationQuery(value);
  }, []);
  const memoizedOnSkillSearch = useCallback((value: string) => {
    setSkillsQuery(value);
  }, []);
  const memoizedOnAssignedToSearch = useCallback((value: string) => {
    setUsersQuery(value);
  }, []);

  const handleSelectLocation = (locations: Array<string>) => {
    setFilter((prev) => ({ ...prev, locations: locations.join(","), page: 1 }));
    pushPageToUrl();
  };

  const handleSelectSkills = (skills: Array<string>) => {
    setFilter((prev) => ({ ...prev, skills: skills.join(","), page: 1 }));
    pushPageToUrl();
  };
  const handleSelectAssignedTo = (assignedTo: Array<string>) => {
    setFilter((prev) => ({
      ...prev,
      assignedToIds: assignedTo.join(","),
      page: 1,
    }));
    pushPageToUrl();
  };

  const handleDurationChange = (
    duration: number | null,
    sendDuration: boolean = true
  ) => {
    setFilter((prev) => {
      let filter: IFilter = { ...prev, durationInMonths: duration, page: 1 };
      if (!sendDuration) {
        delete filter.durationInMonths;
      }
      return filter;
    });
    pushPageToUrl();
  };

  const handleNumberOfDeveloperChange = (
    noOfDevelopers: number | null,
    sendDev: boolean = true
  ) => {
    setFilter((prev) => {
      let filter: IFilter = {
        ...prev,
        noOfDevelopers: noOfDevelopers,
        page: 1,
      };
      if (!sendDev) {
        delete filter.noOfDevelopers;
      }
      return filter;
    });
    pushPageToUrl();
  };

  const handleChangeExperienceRange = (
    experienceRange: [number, number],
    sendExperience: boolean = true
  ) => {
    setFilter((prev) => {
      let filter: IFilter = {
        ...prev,
        minExperience: experienceRange[0],
        maxExperience: experienceRange[1],
        page: 1,
      };
      if (!sendExperience) {
        delete filter.minExperience;
        delete filter.maxExperience;
      }
      return filter;
    });
    pushPageToUrl();
  };

  const handleChangeBudgetRange = (
    budgetRange: [number, number],
    sendBudget: boolean = true
  ) => {
    setFilter((prev) => {
      let filter: IFilter = {
        ...prev,
        minBugetInr: budgetRange[0],
        maxBudgetInr: budgetRange[1],
        page: 1,
      };
      if (!sendBudget) {
        delete filter.minBugetInr;
        delete filter.maxBudgetInr;
      }
      return filter;
    });
    pushPageToUrl();
  };

  // add / edit  requirement modal functionality
  const showModal = () => {
    const editFromValues: any = {
      companyId: companyId,
      status: true,
    };
    setEditRequirementData(editFromValues);
    setIsAddRequirementModalOpen(true);
  };

  const handleOk = () => {
    if (isEditRequirementModalOpen) {
      setIsEditRequirementModalOpen(false);
      setEditRequirementData(initialValuesObject);
    } else {
      setIsAddRequirementModalOpen(false);
      setEditRequirementData(initialValuesObject);
    }
  };

  const handleCancel = () => {
    if (isFilled) {
      const shouldLeave = confirm(
        "Unsaved changes will be lost. Are you sure you want to continue?"
      );
      if (shouldLeave) {
        if (isEditRequirementModalOpen) {
          setIsEditRequirementModalOpen(false);
          setEditRequirementData(initialValuesObject);
        } else {
          setIsAddRequirementModalOpen(false);
          setEditRequirementData(initialValuesObject);
        }
        SetIsfilled(false);
      }
    } else {
      if (isEditRequirementModalOpen) {
        setIsEditRequirementModalOpen(false);
        setEditRequirementData(initialValuesObject);
      } else {
        setIsAddRequirementModalOpen(false);
        setEditRequirementData(initialValuesObject);
      }
    }
  };

  const viewCancel = () => {
    setIsViewRequirementModalOpen(false);
  };

  // delete requirement modal functionality
  const showDeleteModal = (id: string) => {
    setIdToDeleteRequirement(id);
    setIsDeleteRequirementModalOpen(true);
  };

  const handleDeleteOk = () => {
    deleteRequirementByID();
  };

  const handleDeleteCancel = () => {
    setIsDeleteRequirementModalOpen(false);
  };

  const matchProfiles = (id: string) => {
    router.push({
      pathname: "/dashboard/profiles",
      query: {
        requirementId: id,
        page: 1,
      },
    });
  };

  // toggle
  const { editRequirementMutate } = useAddRequirement({
    handleCancel,
    refetchAllRequirement,
    status,
    SetIsfilled,
  });
  const toggleChange = (checked: boolean, id: string) => {
    editRequirementMutate({ status: checked === true ? 1 : 0, id: id });
  };

  // edit requirement modal functionality
  const showEditRequirementModal = (values: any) => {
    const editFromValues: any = {
      companyId: values?.company?.id,
      id: values.id,
      minExperience: values?.minExperience,
      maxExperience: values?.maxExperience,
      noOfDevelopers: values?.numberOfDevelopers,
      budgetInr: values?.budgetInr,
      locations: values.location.map((each: any) => each.id),
      durationInMonths: values.durationValue,
      skills: values.skills.map((each: any) => each.id),
      status: values?.status === 1 ? true : false,
      assignedTo: values?.assignedTo?.id,
    };

    setEditRequirementData(editFromValues);
    setIsEditRequirementModalOpen(true);
  };

  const showViewRequirementModal = (id: string) => {
    router.push({
      pathname: `/dashboard/requirements/${id}`,
    });
    // console.log("values", values);
    // const createdDate = dateGenerator(values.createdAt);
    // const viewModalValues: any = {
    //   createdAt: createdDate,
    //   assignedTo: values.assignedTo.name,
    //   companyName: values.company.name,
    //   experienceRange: values.experienceRange,
    //   duration: values.duration,
    //   budgetInr: values.budgetInr,
    //   numberOfDevelopers: values.numberOfDevelopers,
    //   skills: values.skills,
    //   location: values.location,
    // };
    // setViewData(viewModalValues);
    // setIsViewRequirementModalOpen(true);
  };

  const GetRequirementsTableData = () => {
    const pagination = requirements?.meta?.pagination;
    const offset = (pagination?.currentPage - 1) * pagination?.perPage;
    const currPage = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 15;
    return requirements?.data?.map((requirement: any, index: number) => ({
      key: (currPage - 1) * perPage + index + 1,
      SNo: `${
        offset + index + 1 < 10
          ? "0" + `${offset + index + 1} `
          : offset + index + 1
      }`,
      skills: requirement?.skills,
      id: requirement.id,
      company: requirement.company,
      experienceRange: `${requirement.minExperience}-${requirement.maxExperience} Years`,
      minExperience: requirement.minExperience,
      maxExperience: requirement.maxExperience,
      numberOfDevelopers: requirement.noOfDevelopers,
      location: requirement.locations,
      duration: `${requirement.durationInMonths} months`,
      budgetInr: requirement.budgetInr,
      durationValue: requirement.durationInMonths,
      status: requirement.status,
      matchScore: requirement.matchScore,
      router: router,
      assignedTo: requirement.assignedTo,
      createdAt: requirement.createdAt,
      showDeleteModal,
      handleDeleteOk,
      showEditRequirementModal,
      showViewRequirementModal,
      matchProfiles,
      toggleChange,
    }));
  };

  useEffect(() => {
    setFilter((prev) => ({ ...prev, page: Number(page) }));
  }, [page]);
  useBeforeUnload(isFilled);
  return {
    allRequirement: GetRequirementsTableData(),
    pagination: requirements?.meta?.pagination,
    columns: columns?.filter((column) =>
      !!profileId
        ? column.key !== "action"
        : column.key !== "matchScore" && column.key !== "matchAction"
    ),
    location: location?.data ?? [],
    isFetching: requirementLoading,
    onSearch,
    // handleSelectSortBy:handleSelectSortBy,
    handleSelectLocation,
    handleChangeExperienceRange,
    handleChangeBudgetRange,
    handleNumberOfDeveloperChange,
    handleDurationChange,
    isAddRequirementModalOpen,
    isEditRequirementModalOpen,
    isDeleteRequirementModalOpen,
    showModal,
    handleOk,
    handleCancel,
    showDeleteModal,
    handleDeleteOk,
    handleDeleteCancel,
    profileId: profileId,
    initialValues: editRequirementData,
    setSliderDev,
    sliderDev,
    setSliderDuration,
    sliderDuration,
    setIsSliderSetDev,
    sliderSetDev,
    setIsSliderSetDuration,
    sliderSetDuration,
    setSlider,
    slider,
    setIsSliderSet,
    isSliderSet,
    refetchAllRequirement,
    loadingRequirement,
    status,
    setStatus,
    SetIsfilled,
    handleSelectSkills,
    allSkills: allSkills?.data ?? [],
    memoizedOnLocationSearch,
    memoizedOnSkillSearch,
    handleSelectAssignedTo,
    memoizedOnAssignedToSearch,
    allUsers: allUsers?.data ?? [],
    isViewModalOpen,
    viewCancel,
    viewData,
    isBudgetSliderSet,
    setIsBudgetSliderSet,
    setSliderBudget,
    sliderBudget,
  };
};

export default useRequirement;
