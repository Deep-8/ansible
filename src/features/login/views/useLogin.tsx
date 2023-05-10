import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/services/login";
import { toast } from "react-toastify";

const useLogin = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (response: any) => {
      return loginApi(response);
    },
  });

  const handleCallbackResponse = (response: any) => {
    mutate(response);
  };

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "352534592949-j2g0rito0rf2ps14mmc7ini9es3hji0l.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        ux_mode: "popup",
      });
      google.accounts.id.renderButton(document.getElementById("glogin")!, {
        type: "standard",
        theme: "filled_blue",
        size: "large",
        width: "285",
      });
    };
  }, []);

  return { isLoading };
};

export default useLogin;
