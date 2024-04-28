import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ChatsContext } from "../contexts/ChatsContext";
import Notification from "./Notification";
import NoProfile from "../assets/avatar.svg";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const {
    setChats,
    setCurrentChat,
    setPotentialChats,
    profilePic,
    handleOpenModal,
    modalMenuItemRef,
  } = useContext(ChatsContext);
  const [isOpen, setIsOpen] = useState(false);
  const settingsMenuRef = useRef(null);
  // const [storageName,setStorageName] =useState(null)
  // useEffect(()=>{
  //   setStorageName(localStorage.get)
  // },[user])
  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
    setChats(null);
    setCurrentChat(null);
    setPotentialChats(null);
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
      className="bg-slate-950
    h-14 mb-4 relative "
    >
      <div className="mx-auto h-full items-center w-3/4 flex justify-between">
        <h2 className=" text-2xl">
          <Link to="/">ChatApp</Link>
        </h2>
        {user && (
          <span className="text-orange-300">
            Logged in as{" "}
            <span style={{ textTransform: "capitalize" }}>
              {user?.name?.split(" ")[0]}
            </span>
          </span>
        )}
        <ul className="flex items-center justify-center gap-4">
          {user ? (
            <div className="flex items-center justify-center gap-8">
              <Notification />
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
                        ? `http://localhost:5000/uploads/` +
                          profilePic?.fileName
                        : NoProfile
                    }
                    alt="profile"
                  />
                </div>
              </li>
              <div ref={settingsMenuRef}>
                <div>
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
                  }transition-all   before:content-[''] before:absolute before:-top-0 before:left-[60px] before:h-5 before:w-6 before:bg-white before:rotate-45 z-20 before:-z-10 ease-in duration-70 bg-white text-gray-700 shadow-2xl w-[250px] absolute top-12 right-4 rounded-xl`}
                >
                  <ul className="my-2">
                    <li
                      ref={modalMenuItemRef}
                      className="cursor-pointer hover:bg-gray-200 transition-all ease-in duration-75  p-2"
                      onClick={handleOpenModal}
                    >
                      Edit Name
                    </li>
                    <li className="cursor-pointer transition-all ease-in duration-75 p-2 hover:bg-gray-200">
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
