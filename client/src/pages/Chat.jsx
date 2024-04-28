import { useContext, useEffect, useRef, useState } from "react";
import { ChatsContext } from "../contexts/ChatsContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../contexts/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import CustomSkeleton from "../components/skeletons/CustomSkeleton";

import ChatBoxSkeleton from "../components/skeletons/ChatBoxSkeleton";
import SettingModal from "../components/modal/SettingModal";
import ActionModal from "../components/modal/ActionModal";
const Chat = () => {
  const {
    chats,
    isChatsLoading,

    updateCurrentChat,
    currentChat,
    isModalOpen,
    deleteChat,
    setIsActionModalOpen,
    isActionModalOpen,
    chatToDelete,
  } = useContext(ChatsContext);
  const dropDownRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [openChatIndices, setOpenChatIndices] = useState([]);
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
    setIsActionModalOpen(false);
  };
  return (
    <div className=" ">
      <PotentialChats />

      {chats?.length === 0 ? (
        <p className="text-center w-[100%]  text-gray-400 font-bold text-2xl flex items-center justify-center">
          No chats yet
        </p>
      ) : (
        <div className="flex gap-12      mb-5  container">
          <div className="bg-white h-[70vh]">
            <div className="flex-[50%] border-x-[.2px] w-[450px] h-full  flex-grow  overflow-y-auto ">
              {isChatsLoading && (
                <div className="w-max">
                  <CustomSkeleton size={6} />
                </div>
              )}
              {chats &&
                chats?.map((chat, index) => {
                  return (
                    <div
                      className=""
                      key={index}
                      onClick={() => updateCurrentChat(chat)}
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

          <div className="flex-[60%]   ">
            {isChatsLoading ? (
              <ChatBoxSkeleton count={5} />
            ) : currentChat !== null ? (
              <ChatBox />
            ) : (
              <p className="text-center w-[100%] h-[70vh] text-gray-400 font-bold text-2xl flex items-center justify-center">
                No conversations yet
              </p>
            )}
            {}
          </div>
        </div>
      )}

      <SettingModal
        isModalOpen={isModalOpen}
        headerText={"Edit Name"}
        user={user}
      />
      <ActionModal
        isActionModalOpen={isActionModalOpen}
        header={"Delete chats?"}
        buttonText={"Delete"}
        onCancel={handleCancel}
        onAgree={deleteChatz}
      />
    </div>
  );
};

export default Chat;
