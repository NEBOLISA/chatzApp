/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import NoProfile from "../assets/avatar.svg";
import { useContext, useEffect, useRef } from "react";
import { ChatsContext } from "../contexts/ChatsContext";
const SideMenu = ({ isSideMenuOpen,  user, setIsSideMenuOpen }) => {
  const {
    logout,
    setIsEditNameModalOpen,
    respModalMenuItemRef,
    setIsChangePicModalOpen,
    respModalChangePicItemRef,
    hambugerItemRef,
    profilePic
  } = useContext(ChatsContext);
  const sideMenuRef = useRef(null);
  const handleOpenModal = () => {
    setIsEditNameModalOpen(true);
    setIsSideMenuOpen(false);
  };
  const handlePicChange = () => {
    setIsSideMenuOpen(false);
    setIsChangePicModalOpen(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        setIsSideMenuOpen(false);

        if (hambugerItemRef.current.contains(event.target)) {
          setIsSideMenuOpen(true);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`${
        isSideMenuOpen
          ? "visible opacity-100 -translate-x-0 transition duration-300 ease-in"
          : "invisible opacity-0 translate-x-10 transition duration-300 ease-out hidden"
      } lg:hidden absolute rounded-tl-lg rounded-bl-lg top-0 left-0 right-0 bottom-0 w-full h-[100vh] bg-slate-100/50 z-[100] `}
    >
      <div
        ref={sideMenuRef}
        className={`${
          isSideMenuOpen
            ? "fixed visible opacity-100 -translate-x-0 transition duration-300 ease-in shadow-lg right-0 top-0 bottom-0 z-50  bg-white text-gray-500"
            : "invisible opacity-0 translate-x-10 transition duration-300 ease-out"
        } sm:left-[20%] md:left-[50%] bmd:left-[40%] lg:hidden `}
      >
        <div
          onClick={() => setIsSideMenuOpen(false)}
          className="p-4 pb-1 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="black "
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </div>
        <div className=" flex flex-col justify-center items-center border-b-[.4px] pt-0 p-2 border-gray-400">
          <img
            className="w-[100px] h-[100px] rounded-full object-cover"
            src={profilePic ? profilePic : NoProfile}
            alt="profile"
          />
          <p className=" text-black mt-2">{user?.name}</p>
        </div>

        <div className="">
          
          <div
            ref={respModalMenuItemRef}
            onClick={handleOpenModal}
            className="p-2 cursor-pointer mb-1 hover:bg-slate-300 flex items-center gap-2"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </span>
            Edit Name
          </div>
          <div
            ref={respModalChangePicItemRef}
            onClick={handlePicChange}
            className="p-2 cursor-pointer flex items-center gap-2 mb-1 hover:bg-slate-300"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                className="bi bi-person-bounding-box"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              </svg>
            </span>
            Change Profile Picture
          </div>
          <div
            onClick={logout}
            className="p-2 cursor-pointer flex items-center gap-2 mb-1 hover:bg-slate-300"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                className="bi bi-box-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                />
              </svg>
            </span>
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
