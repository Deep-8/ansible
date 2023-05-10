import Image from "next/image";
import React, { Fragment } from "react";
import { Menu } from "antd";
import useSidebar from "./views/useSidebar";
const Sidebar = () => {
  const {
    items,
    current,
    isSidebarOpen,
    setIsSidebarOpen,
    onClickSidebar,
    role,
  } = useSidebar();
  return (
    <aside
      className={`shadow-lg h-screen default-transition bg-white ${
        isSidebarOpen ? "w-60" : "w-20"
      } z-10  fixed `}
    >
      <div className="flex justify-center items-center">
        <Image
          className="pt-8 mb-12 md:mb-20 mx-auto bg-gr"
          src={`${
            isSidebarOpen ? "/assets/crewlogo.png" : "/assets/favicon.png"
          }`}
          alt="company_logo"
          width={isSidebarOpen ? 160 : 30}
          height={135}
        />
      </div>
      <div className=" h-4/5 overflow-y-auto">
        <Menu selectedKeys={[current]} mode="vertical">
          {items?.map((each) => (
            <Menu.Item
              onClick={() => {
                onClickSidebar(each);
              }}
              key={each.key}
            >
              <div className="flex items-center">
                {each?.key == current ? (
                  <img src={each.active} className="w-5 h-5 " />
                ) : (
                  <img src={each.inactive} className="w-5 h-5 " />
                )}

                <button
                  className={`ml-3  ${
                    isSidebarOpen ? "text-base" : "text-[0px]"
                  } `}
                >
                  {each?.label}
                </button>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item onClick={() => setIsSidebarOpen(isSidebarOpen)}>
            <div
              className={`default-transition cursor-pointer flex justify-center items-center text-center ${
                isSidebarOpen ? "rotate-360" : "rotate-180 "
              }`}
            >
              <img src="/assets/sidebaropen.svg" />
            </div>
          </Menu.Item>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
