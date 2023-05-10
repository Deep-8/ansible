import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import useHeader from "./views/useHeader";

const Header = () => {
  const { logout, section, log, img, bodyRef, setLogout, detailsApply } =
    useHeader();

  return (
    <div className="flex py-4 justify-between items-center  top-0  border-b-2 border-opacity-10  border-grey-med  ">
      <div className=" text-xl font-semibold text-page capitalize">
        {detailsApply(section)}
      </div>

      <div className="flex gap-4  p-0 items-center ">
        <img
          src={img}
          alt="user_image"
          className="rounded-full flex justify-center items-center  w-12 h-12"
          referrerPolicy="no-referrer"
        />
        <div>
          <IoIosArrowDown
            className="cursor-pointer mr-2"
            onClick={() => {
              if (log == true) setLogout(false);
              else if (log == false) setLogout(true);
            }}
          ></IoIosArrowDown>
          {log && (
            <button
              ref={bodyRef}
              className=" bg-page text-white text-xl hover:bg-dark hover:text-white py-2 px-4 shadow-[0px_20px_20px_10px_#00000024] cursor-pointer absolute top-18 mt-3 right-4 rounded-md z-20 "
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
