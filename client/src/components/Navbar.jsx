import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ChatsContext } from "../contexts/ChatsContext";
import Notification from "./Notification";
import NoProfile from "../assets/avatar.svg";
import logo from "../assets/chatLogo2.png";
import { uploadUrl } from "../utils/services";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const {
    logout,
    profilePic,
    handleOpenModal,
    modalMenuItemRef,
    setIsChangePicModalOpen,
    handleMenuToggle,
    changePicItemRef,
    hambugerItemRef,
  } = useContext(ChatsContext);
  const [isOpen, setIsOpen] = useState(false);

  const settingsMenuRef = useRef(null);
  // const [storageName,setStorageName] =useState(null)
  // useEffect(()=>{
  //   setStorageName(localStorage.get)
  // },[user])
  const handlePicChange = () => {
    setIsOpen(false);
    setIsChangePicModalOpen(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      } else if (modalMenuItemRef.current === event.target) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className=" bg-slate-700
    h-14 mb-4 "
    >
      <div className="mx-auto h-full items-center sm:w-[95%] lg:[95%] w-3/4 flex justify-between">
        <div className=" flex text-2xl items-center justify-center">
          <Link to="/">
            <img className="w-[100px] h-[100px] mt-2" src={logo} alt="logo" />
          </Link>
          {/* <h2 className="-ml-5">
            <Link to="/">MessageMe</Link>
          </h2> */}
        </div>
        {user && (
          <span className="xsm:hidden md:block text-green-500">
            <span style={{ textTransform: "capitalize" }}>{user?.name}</span>
          </span>
        )}
        <ul className="flex items-center justify-center gap-4">
          {user ? (
            <>
              <div className="sm:block  lg:flex items-center justify-center gap-8">
                <Notification />
                <div className="sm:hidden lg:flex items-center justify-center gap-8">
                  <li onClick={logout}>
                    {" "}
                    <Link to="/login">Logout</Link>
                  </li>
                  <li>
                    <div>
                      <img
                        className="w-[30px] h-[30px] ml-3 rounded-full object-cover"
                        src={
                          profilePic
                            ? `${uploadUrl}/uploads/` + profilePic?.fileName
                            : NoProfile
                        }
                        alt="profile"
                      />
                    </div>
                  </li>
                </div>
                <div ref={settingsMenuRef}>
                  <div className="sm:hidden lg:flex">
                    <svg
                      onClick={() => setIsOpen((prevState) => !prevState)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots-vertical cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                  </div>
                  <div
                    className={`${
                      isOpen
                        ? "visible opacity-100 translate-y-0 transition duration-300 ease-in"
                        : "invisible opacity-0 -translate-y-5 transition duration-300 ease-out "
                    }transition-all   before:content-[''] before:absolute before:-top-0 before:right-[10px] before:h-5 before:w-6 before:bg-white before:rotate-45 z-20 before:-z-10 ease-in duration-70 bg-white text-gray-700 shadow-2xl w-[250px] absolute top-12 right-4 rounded-xl xsm:hidden lg:block`}
                  >
                    <ul className="my-2">
                      <li
                        ref={modalMenuItemRef}
                        className="cursor-pointer hover:bg-gray-200 transition-all ease-in duration-75  p-2"
                        onClick={handleOpenModal}
                      >
                        Edit Name
                      </li>
                      <li
                        ref={changePicItemRef}
                        className="cursor-pointer transition-all ease-in duration-75 p-2 hover:bg-gray-200"
                        onClick={handlePicChange}
                      >
                        Change Profile Picture
                      </li>
                      <li
                        onClick={logout}
                        className="cursor-pointer transition-all ease-in duration-75 p-2 hover:bg-gray-200"
                      >
                        <Link to={"/login"}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                ref={hambugerItemRef}
                onClick={handleMenuToggle}
                className="sm:block lg:hidden cursor-pointer w-6 h-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}> Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
