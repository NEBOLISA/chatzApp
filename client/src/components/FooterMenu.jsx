// import { useState } from "react";

/* eslint-disable react/prop-types */
const FooterMenu = ({ isActive, setActive }) => {
  return (
    <div className="h-[70px] sm:flex lg:hidden absolute left-0 right-0 -bottom-10 bg-white">
      <div className="flex justify-around w-[100%] items-center">
        <div
          onClick={() => setActive("chats")}
          className={`${
            isActive === "chats" ? "bg-[#e7e7e7]" : ""
          } py-[5px] px-4 h-full w-full flex justify-center items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#000"
            className="bi bi-chat-dots-fill cursor-pointer "
            viewBox="0 0 16 16"
          >
            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        </div>
        <div
          onClick={() => setActive("potentialChats")}
          className={`${
            isActive === "potentialChats" ? "bg-[#e7e7e7]" : ""
          } py-[5px] px-4 h-full w-full flex justify-center items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#000"
            className="bi bi-people-fill cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default FooterMenu;
