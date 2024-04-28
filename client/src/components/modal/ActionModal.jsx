import { useContext, useEffect, useRef } from "react";
import { ChatsContext } from "../../contexts/ChatsContext";

/* eslint-disable react/prop-types */
const ActionModal = ({
  header,
  buttonText,
  isActionModalOpen,
  onCancel,
  onAgree,
}) => {
  const deleteModalRef = useRef(null);
  const { setIsActionModalOpen, isDeleteLoading } = useContext(ChatsContext);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteModalRef.current &&
        !deleteModalRef.current.contains(event.target)
      ) {
        // modalMenuItemRef.current.contains(event.target)
        // ? setIsModalOpen(true)
        //   :
        setIsActionModalOpen(false);
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
        isActionModalOpen ? "visible opacity-100 " : "invisible opacity-0 "
      }absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-700/50 z-10`}
    >
      <div
        ref={deleteModalRef}
        className={`${
          isActionModalOpen
            ? "visible opacity-100 translate-y-0 transition duration-300 ease-in "
            : "invisible opacity-0 -translate-y-5 transition duration-300 ease-out"
        } transition-all ease-in bg-white duration-70 w-[400px] h-[170px] p-3 rounded-md`}
      >
        <p className="text-gray-700 text-xl mb-16">{header}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 rounded-2xl text-[#17adb0] py-1 bg-transparent shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            className="px-6 rounded-2xl py-1 bg-[#17adb0] hover:bg-[#276a6bf6]"
          >
            {isDeleteLoading ? "Deleting..." : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ActionModal;
