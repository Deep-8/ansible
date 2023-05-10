import BreadCrumb from "@/components/breadCrumb";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useClickOutSide from "./useClickOutSide";
import useLogout from "./useLogout";

const useHeader = () => {
  const router = useRouter();
  const { requirementId, profileId } = router.query;
  const { logout } = useLogout();
  const [section, setSection] = useState<string>("");
  const [log, setLogout] = useState<boolean>(false);
  const [img, setImg] = useState<string | undefined>("/assets/google.png");
  useEffect(() => {
    const path = router.pathname;
    setSection(path.slice(11));
    setImg(getCookie("userPic") ?? "/assets/google.png");
  }, []);
  const detailsApply = (section: any) => {
    if (section?.includes("[vendorId]")) {
      return <BreadCrumb />;
    } else if (section?.includes("[companyId]")) {
      return <BreadCrumb />;
    } else if (section?.includes("[requirementId]")) {
      return <BreadCrumb />;
    } else if (section?.includes("[profileId]")) {
      return <BreadCrumb />;
    } else {
      return (
        <>
          {requirementId || profileId ? "Matched " : ""}
          {section}
        </>
      );
    }
  };
  const bodyRef = useRef<HTMLButtonElement | null>(null);
  useClickOutSide(bodyRef, () => {
    setLogout(false);
  });
  return { logout, section, log, img, setLogout, bodyRef, detailsApply };
};

export default useHeader;
