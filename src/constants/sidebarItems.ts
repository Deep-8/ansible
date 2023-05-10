import { getCookie } from "@/utils/cookies";

const role = getCookie("role");

const sidebarItems = [
  {
    label: "Companies",
    key: "companies",
    active: "/assets/active_companies.svg",
    inactive: "/assets/companies.svg",
    path: "/dashboard/companies",
  },
  {
    label: "Requirements",
    key: "requirements",
    active: "/assets/active_requirements.svg",
    inactive: "/assets/requirements.svg",
    path: "/dashboard/requirements",
  },
  {
    label: "Vendors",
    key: "vendors",
    active: "/assets/active_vendor.svg",
    inactive: "/assets/vendors.svg",
    path: "/dashboard/vendors",
  },
  {
    label: "Profiles",
    key: "profiles",
    active: "/assets/active_profile.svg",
    inactive: "/assets/profiles.svg",
    path: "/dashboard/profiles",
  },
  {
    label: "Skills",
    key: "skills",
    active: "/assets/active_skill.svg",
    inactive: "/assets/skills.svg",
    path: "/dashboard/skills",
  },
  {
    label: "Location",
    key: "location",
    active: "/assets/active_location.svg",
    inactive: "/assets/location.svg",
    path: "/dashboard/location",
  },
  {
    label: "User Management",
    key: "user",
    active: "/assets/active_user.svg",
    inactive: "/assets/user.svg",
    path: "/dashboard/user",
  },
];

export const sidebarElements = () => {
  if (role === "1") {
    return sidebarItems;
  } else {
    const filteredSidebar = sidebarItems.filter((each) => {
      return !["user"].includes(each.key);
    });
    return filteredSidebar;
  }
};
