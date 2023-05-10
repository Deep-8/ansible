import React, { FC, useState } from "react";
import ButtonComponent from "../../button";

const SubheaderCompany: FC<any> = ({ onOpen }) => {
  const [searching, setSearch] = useState<string>("");
  return (
    <div className="flex justify-end flex-wrap py-4 ">
      <div className="pt-4 md:pt-0 w-full md:w-fit ">
        <ButtonComponent text={"Add Company"} clickFn={() => onOpen()} />
      </div>
    </div>
  );
};

export default SubheaderCompany;
