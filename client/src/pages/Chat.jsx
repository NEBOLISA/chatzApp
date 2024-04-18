import { useContext } from "react";
import { ChatsContext } from "../contexts/ChatsContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../contexts/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import CustomSkeleton from "../components/skeletons/CustomSkeleton";

import ChatBoxSkeleton from "../components/skeletons/ChatBoxSkeleton";
import SettingModal from "../components/modal/SettingModal";
const Chat = () => {
  const { chats, isChatsLoading, updateCurrentChat, currentChat, isModalOpen } =
    useContext(ChatsContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="h-lvh">
      <PotentialChats />

      {chats?.length === 0 ? (
        <p className="text-center w-[100%] h-[70vh] text-gray-400 font-bold text-2xl flex items-center justify-center">
          No chats yet
        </p>
      ) : (
        <div className="flex gap-12  ">
          <div className="flex-[50%] border-x-[.2px] w-[450px] h-lvh    bg-white overflow-y-scroll ">
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
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
          </div>

          <div className="flex-[60%]">
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
    </div>
  );
};

export default Chat;
