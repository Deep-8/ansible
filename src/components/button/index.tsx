import React, { FC } from "react";
interface btn {
  text: string;
  clickFn: () => void;
}

const ButtonComponent: FC<btn> = ({ clickFn, text }) => {
  return (
    <button
      className="bg-page px-4 md:px-7 w-full md:w-fit h-11 rounded-md text-white hover:bg-dark "
      onClick={clickFn}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
