import { useContext, useEffect, useRef, useState } from "react";

import { ChatsContext } from "../../contexts/ChatsContext";

/* eslint-disable react/prop-types */
const SettingModal = ({ isModalOpen, headerText }) => {
  const { changedName, setChangedName, setIsModalOpen, modalMenuItemRef } =
    useContext(ChatsContext);
  const [name, setName] = useState(changedName);
  useEffect(() => {
    setName(changedName);
  }, [isModalOpen]);
  const settingsModalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsModalRef.current &&
        !settingsModalRef.current.contains(event.target)
      ) {
        modalMenuItemRef.current.contains(event.target)
          ? setIsModalOpen(true)
          : setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={settingsModalRef}>
      <div
        className={`${
          isModalOpen ? "visible opacity-100 " : "invisible opacity-0 "
        }w-[400px] h-[170px] bg-[#383838] absolute top-[50%] bottom-0 left-[50%] right-0  -translate-y-2/4 -translate-x-2/4 rounded-md shadow-lg`}
      >
        <p className="text-center text-xl mt-2">{headerText}</p>
        <div className="w-full flex justify-center items-center mt-9 ">
          <input
            className="w-full mx-2 bg-[#828282] text-white pl-1 border-none outline-none"
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setChangedName(e.target.value);
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div className="flex justify-center items-center pt-4">
          <button
            className="bg-blue-600 p-[4px] rounded-md cursor-pointer font-bold text-sm"
            type="button"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingModal;
