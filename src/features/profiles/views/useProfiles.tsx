import {
  addProfile,
  IprofileByIdPayload,
  IprofilePayload,
  IProfilesFilter,
} from "@/interfaces/profiles";
import {
  IcompanyName,
  Ilocation,
  IMatchScore,
  ITableCellHeader,
} from "@/interfaces/requirements";
import { Iskills, ISkillsPayload } from "@/interfaces/skills";
import {
  deleteProfile,
  editProfile,
  getAllProfiles,
  getProfileByID,
} from "@/services/profiles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Switch, Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { getAllLocation } from "@/services/location";
import { ILocationPayload } from "@/interfaces/location";
import useDebounce from "@/utils/useDebounce";
import { DownloadOutlined, SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  TableCellHeader,
  TableRowRenderer,
} from "@/components/tableComponent/rowRenderer";
import useBeforeUnload from "@/utils/useBeforeUnload";
import { getAllSkills } from "@/services/skills";
import useAddEditProfile from "../addAndEdit/views/useAddEditProfile";

const getStatusText: any = {
  0: {
    name: "Unavailable",
    color: "grey",
  },
  1: {
    name: "Available",
    color: "green",
  },
};

const columns = [
  {
    key: "SNo",
    title: <TableCellHeader>S. No.</TableCellHeader>,
    dataIndex: "SNo",
    width: "4.5rem",
    align: "center" as AlignType,
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
  },
  {
    key: "name",
    title: <TableCellHeader>Name</TableCellHeader>,
    dataIndex: "name",
    width: "8rem",
    ellipsis: true,
    align: "left" as AlignType,
    render: (text: string, record: any) => (
      <TableRowRenderer status={record?.status}>{text}</TableRowRenderer>
    ),
  },
  {
    key: "experience",
    title: <TableCellHeader>Experience</TableCellHeader>,
    dataIndex: "experience",
    width: "7rem",
    align: "center" as AlignType,
    render: (experience: string, record: any) => (
      <TableRowRenderer status={record?.status}>
        {" "}
        <span>{experience} years</span>
      </TableRowRenderer>
    ),
  },
  {
    key: "skills",
    title: <TableCellHeader>Skills</TableCellHeader>,
    dataIndex: "skills",
    width: "11rem",
    render: (skills: Iskills[], record: any) => (
      <TableRowRenderer status={record?.status}>
        <Tooltip
          title={
            <Fragment>
              {skills?.map((each, index) => (
                <span key={each.id}>
                  {each.name}
                  {index != skills.length - 1 && ", "}
                </span>
              ))}
            </Fragment>
          }
        >
          <div className=" text-ellipsis overflow-hidden whitespace-nowrap">
            {skills?.map((each: Iskills, index) => (
              <span key={each.id}>
                {each.name}
                {index != skills.length - 1 && ", "}
              </span>
            ))}
          </div>
        </Tooltip>
      </TableRowRenderer>
    ),
  },
  {
    key: "vendor",
    title: <TableCellHeader>Vendor Name</TableCellHeader>,
    dataIndex: "vendor",
    ellipsis: true,
    width: "10rem",
    render: (vendor: IcompanyName, tags: any) => (
      <TableRowRenderer colorClass="text-page" status={tags?.status}>
        <Tooltip title={vendor.name}>
          <div className=" text-ellipsis overflow-hidden whitespace-nowrap">
            <a
              href={`/dashboard/vendors/${vendor.id}`}
              className="underline cursor-pointer"
            >
              {vendor.name}
            </a>
          </div>
        </Tooltip>
      </TableRowRenderer>
    ),
  },

  {
    key: "locations",
    title: <TableCellHeader>Location / Remote</TableCellHeader>,
    dataIndex: "locations",
    width: "10rem",
    render: (locations: Ilocation[], record: any) => (
      <TableRowRenderer status={record?.status}>
        <Tooltip
          title={
            <Fragment>
              {locations?.map((each, index) => (
                <span key={each.id}>
                  {each.name}
                  {index != locations.length - 1 && ", "}
                </span>
              ))}
            </Fragment>
          }
        >
          <div className=" text-ellipsis overflow-hidden whitespace-nowrap">
            {locations?.map((each, index) => (
              <span key={each.id}>
                {each.name}
                {index != locations.length - 1 && ", "}
              </span>
            ))}
          </div>
        </Tooltip>
      </TableRowRenderer>
    ),
  },
  {
    key: "costInr",
    title: <TableCellHeader>Cost(per month)</TableCellHeader>,
    dataIndex: "costInr",
    width: "8.9rem",
    render: (costInr: number, record: any) => (
      <TableRowRenderer status={record?.status}>
        <Tooltip title={`₹ ${costInr}`}>
          <span className=" text-ellipsis overflow-hidden whitespace-nowrap">
            ₹ {costInr}
          </span>
        </Tooltip>
      </TableRowRenderer>
    ),
  },

  {
    key: "status",
    title: <TableCellHeader>Status</TableCellHeader>,
    dataIndex: "status",
    width: "7.2rem",
    align: "center" as AlignType,
    render: (status: number, record: any) => {
      return (
        <Fragment>
          <Switch
            key={record?.id}
            onChange={(checked) => {
              record.toggleChange(checked, record.id);
            }}
            defaultChecked={status === 1 ? true : false}
            checkedChildren="Available"
            unCheckedChildren="Unavailable"
          />
        </Fragment>
      );
    },
  },
  {
    key: "profile",
    title: <TableCellHeader>Profile</TableCellHeader>,
    dataIndex: "profile",
    width: "5rem",
    render: (profile: number, record: any) => (
      <div className="flex justify-center">
        <button onClick={() => record.pdfGeneration(record.id)}>
          <DownloadOutlined className=" text-xl text-main" />
        </button>
      </div>
    ),
  },
  {
    key: "matchScore",
    title: <TableCellHeader>Match Score</TableCellHeader>,
    dataIndex: "matchScore",
    align: "center" as AlignType,
    width: 80,
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
    key: "action",
    title: <TableCellHeader>Action</TableCellHeader>,
    dataIndex: "action",
    ellipsis: true,
    width: "13rem",
    align: "center" as AlignType,
    render: (_: any, record: any) => (
      <div className="flex justify-center items-center gap-x-2">
        <Tooltip title="View">
          <div
            className="cursor-pointer"
            onClick={() => {
              record?.showViewProfileModal(record.id);
            }}
          >
            <Image alt="" width={35} height={35} src="/assets/view.svg" />
          </div>
        </Tooltip>
        <Tooltip title="Edit">
          <div
            className="cursor-pointer"
            onClick={() => {
              record?.showEditProfileModal(record);
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
        <Tooltip title="Match Requirements">
          <div
            className="cursor-pointer"
            onClick={() => {
              if (record.status === 0) {
                toast.warning("This Profile is Inactive");
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
    ellipsis: true,
    width: "10rem",
    align: "center" as AlignType,
    render: (_: any, record: any) => (
      <div className="flex justify-center items-center gap-x-2">
        <div
          className="cursor-pointer"
          onClick={() => {
            record.showEditProfileModal(record);
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
  name: "",
  id: "",
  vendorId: "",
  experience: 0,
  costInr: 0,
  designation: "",
  skills: [],
  locations: [],
  ProfileType: 0,
  imageSlug: "",
  cvSlug: "",
  status: true,
  keySkills: "",
  yearsOfExp: 0,
  education: "",
  certifications: "",
  workExperience: "",
  projects: "",
  highlight: "",
  email: "",
  mobile: "",
};
const useProfiles = () => {
  const router = useRouter();
  const { page, requirementId, vendorId } = router.query;
  const client = useQueryClient();
  const [q, setQ] = useState<string | undefined>();
  const debouncedQuery = useDebounce(q);
  const [isSendProfileModalOpen, setIsSendProfileModalOpen] = useState(false);
  const [slider, setSlider] = useState<any>([0, 100]);
  const [sliderCost, setSliderCost] = useState<any>([0, 100]);
  const [isSliderSet, setIsSliderSet] = useState<boolean>(false);
  const [isCostSliderSet, setIsCostSliderSet] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isFilledSendModal, setIsFilledSendModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Array<{}>>([]);
  const [profileByid, setProfileByid] = useState<string>("");
  const [filter, setFilter] = useState<IProfilesFilter>({
    minExperience: null,
    maxExperience: null,
    minCostInr: null,
    maxCostInr: null,
    page: Number(page) ?? 1,
    skills: "",
    locations: "",
  });
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] =
    useState<addProfile>(initialValuesObject);
  const [status, setStatus] = useState<boolean>(
    initialValuesObject?.status === true ? true : false
  );

  const [skillsQuery, setSkillsQuery] = useState<string>("");
  const debouncedSkillsQuery = useDebounce(skillsQuery);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const debouncedLocationQuery = useDebounce(locationQuery);

  const {
    data: allProfiles,
    isFetching: profileLoading,
    refetch: refetchAllProfiles,
  } = useQuery(["allProfiles", filter, debouncedQuery, requirementId], () => {
    const profilePayload: IprofilePayload = {
      params: {
        include: "locations,skills,vendor,matchScore,portfolio",
        requirementId: requirementId as string,
        q: debouncedQuery,
        vendorId: vendorId as string,
        ...filter,
      },
    };
    return getAllProfiles(profilePayload);
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
        data: data?.data.map((each: any) => ({
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
  const showViewProfileModal = (id: string) => {
    router.push({
      pathname: `/dashboard/profiles/${id}`,
    });
  };
  // edit requirement modal functionality
  const showEditProfileModal = (values: any) => {
    const editFromValues: any = {
      name: values?.name,
      vendorId: values?.vendor.id,
      id: values.id,
      costInr: values?.costInr,
      locations: values?.locations.map((each: any) => each.id),
      skills: values?.skills.map((each: any) => each.id),
      status: values?.status === 1 ? true : false,
      experience: values?.experience,
      imageSlug: values?.imageSlug,
      cvSlug: values?.cvSlug,
      certifications: values?.certifications,
      description: values?.description,
      education: values?.education,
      keySkills: values?.keySkills,
      designation: values?.designation,
      others: values?.others,
      highlight: values?.highlight,
      projects: values?.projects,
      workExperience: values?.workExperience,
      profileType: values?.cvSlug?.slug ? 0 : 1,
      mobile: values?.mobile,
      email: values?.email,
    };
    setStatus(values?.status === 1 ? true : false);
    setEditProfileData(editFromValues);
    setIsEditProfileModalOpen(true);
  };
  const matchProfiles = (id: string) => {
    router.push({
      pathname: "/dashboard/requirements",
      query: {
        profileId: id,
        page: 1,
      },
    });
  };
  const profileByIdPayload: IprofileByIdPayload = {
    params: {
      include: "locations,skills,vendor,matchScore,portfolio",
    },
  };
  const pdfGeneration = async (id: string) => {
    getProfileByID(profileByIdPayload, id).then((data) => {
      if (data.data.resume?.slug != null) {
        window.open(data.data.resume?.slug, "_blank", "noreferrer");
      } else if (data.data.customResume?.slug != null) {
        window.open(data.data.customResume?.slug, "_blank", "noreferrer");
      } else {
        toast.warning("PDF generation might take some time. Please wait.");
      }
    });
  };

  const getProfilesTableData = () => {
    const pagination = allProfiles?.meta?.pagination;
    const offset = (pagination?.currentPage - 1) * pagination?.perPage;
    const currPage = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 15;
    return allProfiles?.data?.map((profiles: any, index: number) => ({
      key: (currPage - 1) * perPage + index + 1,
      SNo: `${
        offset + index + 1 < 10
          ? "0" + `${offset + index + 1} `
          : offset + index + 1
      }`,
      skills: profiles?.skills,
      locations: profiles?.locations,
      id: profiles?.id,
      name: profiles?.name,
      vendor: profiles?.vendor,
      designation: profiles?.designation,
      description: profiles?.description,
      status: profiles?.status,
      profile: profiles?.resume?.slug ?? profiles?.customResume?.slug,
      costInr: profiles?.costInr,
      experience: profiles?.experience,
      matchScore: profiles?.matchScore,
      imageSlug: profiles?.image,
      cvSlug: profiles?.resume,
      certifications: profiles?.portfolio?.certifications,
      education: profiles?.portfolio?.education,
      keySkills: profiles?.portfolio?.keySkills,
      profileHighlights: profiles?.portfolio?.profileHighlights,
      highlight: profiles?.portfolio?.highlight,
      projects: profiles?.portfolio?.projects,
      workExperience: profiles?.portfolio?.workExperience,
      mobile: profiles?.mobile,
      email: profiles?.email,
      showEditProfileModal,
      matchProfiles,
      showDeleteModal,
      pdfGeneration,
      toggleChange,
      showViewProfileModal,
    }));
  };

  const pushPageToUrl = () => {
    router.push({
      pathname: router.pathname,
      query: { page: 1, requirementId: requirementId },
    });
  };

  const handleSelectLocations = (locations: Array<string>) => {
    setFilter((prev) => ({ ...prev, locations: locations.join(","), page: 1 }));
    pushPageToUrl();
  };

  const handleSelectSkills = (skills: Array<string>) => {
    setFilter((prev) => ({ ...prev, skills: skills.join(","), page: 1 }));
    pushPageToUrl();
  };
  const handleSearchSkills = (q: string) => {
    setSkillsQuery(q);
  };

  const onSearch = (value: string) => {
    setQ(value);
    setFilter((prev) => ({ ...prev, page: 1 }));
    pushPageToUrl();
  };
  const handleChangeExperienceRange = (
    experienceRange: [number, number],
    sendExperience: boolean = true
  ) => {
    setFilter((prev) => {
      let filter: IProfilesFilter = {
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

  const handleChangeCostRange = (
    costRange: [number, number],
    sendCost: boolean = true
  ) => {
    setFilter((prev) => {
      let filter: IProfilesFilter = {
        ...prev,
        minCostInr: costRange[0],
        maxCostInr: costRange[1],
        page: 1,
      };
      if (!sendCost) {
        delete filter.minCostInr;
        delete filter.maxCostInr;
      }
      return filter;
    });
    pushPageToUrl();
  };

  const rowSelection = {
    preserveSelectedRowKeys: true,
    getCheckboxProps: (record: any) => ({
      disabled:
        !record.status &&
        !selectedRow.find((rec: any) => rec.key === record.key),
    }),
    selectedRowKeys: selectedRow.map((each: any) => each.key),
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRow(selectedRows);
    },
  };

  const showModal = () => {
    const editFromValues: any = {
      vendorId: vendorId,
      profileType: 0,
      status: true,
    };
    setStatus(true);
    setEditProfileData(editFromValues);
    setIsAddProfileModalOpen(true);
  };

  const handleOk = () => {
    if (isEditProfileModalOpen) {
      setIsEditProfileModalOpen(false);
      setEditProfileData(initialValuesObject);
    } else {
      setIsAddProfileModalOpen(false);
      setEditProfileData(initialValuesObject);
    }
  };

  const handleCancel = () => {
    if (isFilled) {
      const shouldLeave = confirm(
        "Unsaved changes will be lost. Are you sure you want to continue?"
      );
      if (shouldLeave) {
        if (isEditProfileModalOpen) {
          setIsEditProfileModalOpen(false);
          setEditProfileData(initialValuesObject);
        } else {
          setIsAddProfileModalOpen(false);
          setEditProfileData(initialValuesObject);
        }
        setIsFilled(false);
      }
    } else {
      if (isEditProfileModalOpen) {
        setIsEditProfileModalOpen(false);
        setEditProfileData(initialValuesObject);
      } else {
        setIsAddProfileModalOpen(false);
        setEditProfileData(initialValuesObject);
      }
    }
  };

  // edit profile

  const {
    isLoading: editProfileLoading,
    mutate: editProfileMutate,
    isSuccess: editSuccess,
  } = useMutation((payload: addProfile) => editProfile(payload), {
    onSuccess: (data) => {
      toast.success("Profile Updated Successfully");
      client.invalidateQueries(["allProfiles"]);
      refetchAllProfiles();
    },
  });

  const toggleChange = (checked: boolean, id: string) => {
    console.log("checked", checked);
    const payload = { status: checked === true ? 1 : 0, id: id };
    editProfileMutate(payload);
  };

  // delete Profile modal functionality
  const {
    mutate: deleteProfileByID,
    isSuccess,
    isLoading: loadingProfileDelete,
  } = useMutation(() => deleteProfile(idToDeleteProfile!), {
    onSuccess: (data) => {
      setIdToDeleteProfile("");
      setIsDeleteProfileModalOpen(false);
      toast.success(data.message);
      refetchAllProfiles();
    },
    onError: (error) => {},
  });

  const [isDeleteProfileModalOpen, setIsDeleteProfileModalOpen] =
    useState(false);
  const [idToDeleteProfile, setIdToDeleteProfile] = useState<string>();
  const showDeleteModal = (id: string) => {
    setIdToDeleteProfile(id);
    setIsDeleteProfileModalOpen(true);
  };

  const handleDeleteOk = () => {
    deleteProfileByID();
  };

  const handleDeleteCancel = () => {
    setIsDeleteProfileModalOpen(false);
  };

  useEffect(() => {
    setFilter((prev) => ({ ...prev, page: Number(page) }));
  }, [page]);

  const handleSendProfileCancel = () => {
    if (isFilledSendModal) {
      const shouldLeave = confirm(
        "Unsaved changes will be lost. Are you sure you want to continue?"
      );
      if (shouldLeave) {
        setIsSendProfileModalOpen(false);
        setIsFilledSendModal(false);
      }
    } else {
      setIsSendProfileModalOpen(false);
    }
  };
  const showSendProfileModal = () => {
    if (selectedRow.length > 10) {
      toast.warning("You can only only share upto 10 profiles in a go");
    } else {
      setIsSendProfileModalOpen(true);
    }
  };
  const handleSendProfileOk = () => {
    setIsSendProfileModalOpen(false);
  };

  useBeforeUnload(isFilled || isFilledSendModal);

  const memoizedOnLocationSearch = useCallback((value: string) => {
    setLocationQuery(value);
  }, []);
  const memoizedOnSkillSearch = useCallback((value: string) => {
    setSkillsQuery(value);
  }, []);

  return {
    setSelectedRow,
    showSendProfileModal,
    handleSendProfileCancel,
    handleSendProfileOk,
    isDeleteProfileModalOpen,
    showDeleteModal,
    handleDeleteCancel,
    handleDeleteOk,
    isAddProfileModalOpen,
    showModal,
    isSendProfileModalOpen,
    isEditProfileModalOpen,
    handleOk,
    initialValuesObject,
    handleCancel,
    allProfiles: getProfilesTableData(),
    pagination: allProfiles?.meta?.pagination,
    isFetching: profileLoading,
    columns: columns?.filter((column) =>
      !!requirementId
        ? column.key !== "action"
        : column.key !== "matchScore" && column.key !== "matchAction"
    ),
    rowSelection,
    selectedRow,
    handleSelectLocations,
    handleChangeExperienceRange,
    location: location?.data ?? [],
    onSearch,
    initialValues: editProfileData,
    refetchAllProfiles,
    requirementId,
    slider,
    setSlider,
    setIsSliderSet,
    isSliderSet,
    loadingProfileDelete,
    status,
    setStatus,
    setIsFilled,
    setIsFilledSendModal,
    allSkills: allSkills?.data ?? [],
    handleSelectSkills,
    handleSearchSkills,
    memoizedOnLocationSearch,
    memoizedOnSkillSearch,
    sliderCost,
    setIsCostSliderSet,
    setSliderCost,
    handleChangeCostRange,
    isCostSliderSet,
  };
};

export default useProfiles;
