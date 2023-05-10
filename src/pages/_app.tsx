import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import { SideBarContextProvider } from "@/context/sidebar";
import { Detector } from "react-detect-offline";
import { Fragment } from "react";
import NoInternet from "@/components/noInternet";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SideBarContextProvider>
        {router.pathname != "/" && <Sidebar />}
        <Detector
          render={({ online }) => (
            <Fragment>{!online && <NoInternet open={online} />}</Fragment>
          )}
        />
        <Component {...pageProps} />
      </SideBarContextProvider>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </QueryClientProvider>
  );
}
