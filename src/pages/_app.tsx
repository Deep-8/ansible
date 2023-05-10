import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });
import { useRouter } from "next/router";
import { SideBarContextProvider } from "@/context/sidebar";
import { Detector } from "react-detect-offline";
import { Fragment } from "react";
import NoInternet from "@/components/noInternet";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider, useSession } from "next-auth/react";
import dynamic from "next/dynamic";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
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
    </SessionProvider>
  );
}
