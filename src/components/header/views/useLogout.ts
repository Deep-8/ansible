import { eraseCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    eraseCookie("accessToken");
    router.push("/");
  };
  return { logout };
};

export default useLogout;
