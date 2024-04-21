import React from "react";

const DropDown = ({ children, isOpen, setOpen, className }: any) => {
  return isOpen ? (
    <div className={`w-full h-fit rounded-md absolute z-50  ${className}`}>
      <div className="w-full h-fit z-50">{children}</div>
      <div className="bg-black w-full h-full absolute opacity-50 rounded-md backdrop-blur-lg top-0 z-[-100] " />
    </div>
  ) : (
    <div />
  );
};

export default DropDown;
