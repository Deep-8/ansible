import { sidebarElements } from "@/constants/sidebarItems";
import { useSideBarContext, useSideBarUpdateContext } from "@/context/sidebar";
import { getCookie } from "@/utils/cookies";
import useWindowSize, { Size } from "@/utils/useWindowSize";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSidebar = () => {
  const router = useRouter();
  const role = getCookie("role");
  const items = sidebarElements();
  const [current, setCurrent] = useState("companies");
  const isSidebarOpen = useSideBarContext();
  const setIsSidebarOpen = useSideBarUpdateContext(isSidebarOpen);
  const setIsSidebarOpen2 = useSideBarUpdateContext(false);
  const size = useWindowSize();
  const onClickSidebar = (e: any) => {
    setCurrent(e.key);
    if (size.width !== undefined && size?.width < 768) {
      setIsSidebarOpen2(true);
    }
    router.push({
      pathname: e.path,
      query: { page: 1 },
    });
  };
  useEffect(() => {
    if (router.pathname.includes("companies")) setCurrent("companies");
    if (router.pathname.includes("vendors")) setCurrent("vendors");
    if (router.pathname.includes("requirements")) setCurrent("requirements");
    if (router.pathname.includes("profiles")) setCurrent("profiles");
    if (router.pathname.includes("skills")) setCurrent("skills");
    if (router.pathname.includes("location")) setCurrent("location");
    if (router.pathname.includes("user")) setCurrent("user");
  }, [router.pathname]);
  return {
    items,
    current,
    isSidebarOpen,
    setIsSidebarOpen,
    onClickSidebar,
    role,
  };
};

export default useSidebar;
