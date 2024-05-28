import { useContext, useEffect, useRef, useState } from "react";
import { ChatsContext } from "../contexts/ChatsContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../contexts/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import CustomSkeleton from "../components/skeletons/CustomSkeleton";

import ChatBoxSkeleton from "../components/skeletons/ChatBoxSkeleton";

import FooterMenu from "../components/FooterMenu";
import SideMenu from "../components/SideMenu";
import EditNameModal from "../components/modal/EditNameModal";
import DeleteActionModal from "../components/modal/DeleteActionModal";
import ChangePicModal from "../components/modal/ChangePicModal";

const Chat = () => {
  const {
    chats,
    isChatsLoading,

    updateCurrentChat,
    currentChat,
    isEditNameModalOpen,
    deleteChat,
    setIsDeleteActionModalOpen,
    isDeleteActionModalOpen,
    chatToDelete,
    setCurrentChat,
    isSideMenuOpen,
    setIsSideMenuOpen,
  } = useContext(ChatsContext);
  const dropDownRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [openChatIndices, setOpenChatIndices] = useState([]);
  const [isActive, setActive] = useState("chats");
  useEffect(() => {
    setOpenChatIndices(Array(chats?.length).fill(false));
  }, [chats]);

  const toggleChatDropDown = (index, e) => {
    e.stopPropagation();
    setOpenChatIndices((prevIndices) =>
      prevIndices.map((isOpen, i) => (i === index ? !isOpen : false))
    );
  };
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setOpenChatIndices((prevIndices) =>
        prevIndices.map((isOpen) => (isOpen === true ? false : false))
      );
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deleteChatz = () => {
    deleteChat(chatToDelete);
  };
  const handleCancel = () => {
    setIsDeleteActionModalOpen(false);
  };
  const handleBackToChats = () => {
    setCurrentChat(null);
  };
  return (
    <div className="h-[100%] ">
      <PotentialChats isActive={isActive} />

      <FooterMenu isActive={isActive} setActive={setActive} />
      {chats?.length === 0 ? (
        <p
          className={`sm:${
            isActive === "chats" ? "block w-full" : "hidden"
          } text-center w-[100%]  text-gray-400 font-bold text-2xl flex items-center justify-center`}
        >
          No chats yet
        </p>
      ) : (
        <div className=" sm:h-[100%] lg:h-[70vh]  sm:flex sm:flex-col lg:flex-row  lg:flex gap-12   lg:mb-5 b  ">
          <div
            className={`sm:${
              isActive === "chats" && currentChat === null
                ? "flex w-full flex-1 "
                : "hidden"
            } bg-white sm:h-[80.3dvh]  lg:h-[70vh] lg:block  lg:flex-[50%]`}
          >
            <div
              className={` border-x-[.2px]  h-full  flex-grow  overflow-y-auto`}
            >
              {isChatsLoading && (
                <div className="w-[90%] lg:[75vh] mx-auto">
                  <CustomSkeleton size={6} />
                </div>
              )}
              {chats &&
                chats?.map((chat, index) => {
                  return (
                    <div
                      className=""
                      key={index}
                      onClick={() => {currentChat?._id !== chat?._id &&updateCurrentChat(chat)}}
                    >
                      <UserChat
                        chat={chat}
                        dropDownRef={dropDownRef}
                        user={user}
                        index={index}
                        setOpenChatIndices={setOpenChatIndices}
                        toggleChatDropDown={toggleChatDropDown}
                        openChatIndices={openChatIndices}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={` flex-[60%] overflow-y-hidden  lg:h-[70vh] lg:flex`}>
            {isChatsLoading ? (
              <ChatBoxSkeleton
                isActive={isActive}
                currentChat={currentChat}
                count={5}
              />
            ) : currentChat !== null ? (
              <div
                className={`sm:${
                  currentChat !== null
                    ? "absolute left-0 right-0 top-16 bottom-0 block"
                    : " absolute left-0 right-0 top-16 bottom-0 hidden"
                }  lg:flex-[60%] sm:h-[70vh] lg:h-[70vh]    lg:flex`}
              >
                <ChatBox handleBackToChats={handleBackToChats} />
              </div>
            ) : (
              <p className=" sm:hidden lg:flex text-center w-[100%] h-[70vh] text-gray-400 font-bold text-2xl  items-center justify-center">
                No conversations yet
              </p>
            )}
            {}
          </div>
        </div>
      )}

      <EditNameModal
        isEditNameModalOpen={isEditNameModalOpen}
        headerText={"Edit Name"}
        user={user}
      />
      <DeleteActionModal
        isDeleteActionModalOpen={isDeleteActionModalOpen}
        header={"Delete chats?"}
        buttonText={"Delete"}
        onCancel={handleCancel}
        onAgree={deleteChatz}
      />

      <SideMenu
        setIsSideMenuOpen={setIsSideMenuOpen}
        isSideMenuOpen={isSideMenuOpen}
        user={user}
      />
      <ChangePicModal />
    </div>
  );
};

export default Chat;
