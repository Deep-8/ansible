import { useSideBarContext } from "@/context/sidebar";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Header from "../header";

interface IMainLayout {
  children: React.ReactNode | undefined;
}
const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  const isSidebarOpen = useSideBarContext();
  const router = useRouter();
  return (
    <Fragment>
      <main
        data-sidebar={isSidebarOpen}
        style={{ minHeight: "100vh" }}
        className={`default-transition px-1 md:px-10 container-middle ${
          isSidebarOpen
            ? "md:ml-60 md:w-[calc(100vw-240px)] w-full"
            : "ml-20 md:w-[calc(100vw-80px)]"
        }`}
      >
        {router.pathname != "/" && <Header />}
        {<div className="">{children}</div>}
      </main>
    </Fragment>
  );
};

export default MainLayout;
