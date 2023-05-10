import { eraseCookie } from "@/utils/cookies";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    signOut();
    eraseCookie("accessToken");
  };
  return { logout };
};

export default useLogout;
