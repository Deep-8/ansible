import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/services/login";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useLogin = (session: any, status: string) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (session) => {
      return loginApi(session);
    },
  });

  useEffect(() => {
    if (status == "authenticated") mutate(session);
  }, [session]);

  return { isLoading };
};

export default useLogin;
