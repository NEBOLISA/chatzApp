import { useContext, useEffect, useRef } from "react";

import { ChatsContext } from "../../contexts/ChatsContext";
import { AuthContext } from "../../contexts/AuthContext";

/* eslint-disable react/prop-types */
const EditNameModal = ({ isEditNameModalOpen, headerText }) => {
  const {
    changedName,
    setChangedName,
    setIsEditNameModalOpen,
    modalMenuItemRef,
    handleNameUpdate,
    isNameChangeLoading,
    isNameChangeError,
    respModalMenuItemRef,
  } = useContext(ChatsContext);
  const { user } = useContext(AuthContext);
  //const [name, setName] = useState(changedName);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [isEditNameModalOpen]);
  const settingsModalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsModalRef.current &&
        !settingsModalRef.current.contains(event.target)
      ) {
        modalMenuItemRef.current.contains(event.target) ||
        respModalMenuItemRef.current.contains(event.target)
          ? setIsEditNameModalOpen(true)
          : setIsEditNameModalOpen(false);
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
        isEditNameModalOpen ? "visible opacity-100  " : "invisible opacity-0 "
      } flex justify-center h-[100vh] items-center absolute top-0 left-0 right-0 bottom-0 bg-gray-700/50 z-[100] `}
    >
      <div
        ref={settingsModalRef}
        className={`${
          isEditNameModalOpen
            ? "visible opacity-100 translate-y-0 transition duration-300 ease-in "
            : "invisible opacity-0 -translate-y-5 transition duration-300 ease-out"
        } transition-all ease-in duration-70 xsm:w-[80%] md:w-[400px] h-[170px] bg-white text-gray-600  rounded-md z-50   shadow-2xl`}
      >
        <p className="text-center text-xl mt-2 font-bold">{headerText}</p>
        <div className="w-full h-8 flex justify-center items-center mt-9 ">
          <input
            className="w-full h-8 mx-2 bg-[#efeeee] text-black rounded-sm pl-1 border-none outline-none"
            type="text"
            name="name"
            id="name"
            ref={inputRef}
            onChange={(e) => {
              setChangedName(e.target.value);
              //setName(e.target.value);
            }}
            value={changedName}
          />
        </div>
        <div className="flex justify-center items-center pt-4">
          <button
            onClick={() => handleNameUpdate(changedName, user?._id)}
            className="bg-blue-600 p-[4px] text-white rounded-md cursor-pointer font-bold text-sm"
            type="button"
          >
            {isNameChangeLoading ? "Updating..." : "Update"}
          </button>
          {isNameChangeError && (
            <p className="flex justify-center items-center text-red-400">
              {isNameChangeError.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditNameModal;
