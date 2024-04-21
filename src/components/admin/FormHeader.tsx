import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const FormHeader = ({
  title = "Create an entry",
  load = true,
  onBack,
}: {
  onBack: () => void;
  title?: string;
  load?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <div>
        <div
          className="flex items-center text-primary cursor-pointer hover:text-primary-light"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </div>
        <div className="text-2xl font-bold text-white">{title}</div>
      </div>

      <button type={load ? "submit" : "button"} className={`my-button`}>
        Save
      </button>
    </div>
  );
};

export default FormHeader;
