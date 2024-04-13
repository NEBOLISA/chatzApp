/* eslint-disable react/prop-types */
import React from "react";
const Alert = ({ text, closeAlert }) => {
  return (
    <div className="relative bg-red-100  rounded-sm p-3 mt-3">
      {" "}
      <div className="text-red-900 w-full maxw-[400px] whitespace-normal ">
        {text}
      </div>
      <div
        onClick={closeAlert}
        className="absolute  right-3 top-1  text-red-700 cursor-pointer"
      >
        <p className="cursor-pointer">X</p>
      </div>
    </div>
  );
};
export default React.memo(Alert);
