/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import avatar from "../../assets/avatar.svg";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";

import { ChatsContext } from "../../contexts/ChatsContext";
import moment from "moment";
/* eslint-disable react/prop-types */
const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers, currentChat, messages, notifications, allMessages } =
    useContext(ChatsContext);
  const [NumOfUnreadNots, setNumOfUnreadNots] = useState(0);
  const [lastMessage, setLastMessage] = useState([]);
  //let NumOfUnreadNots;
  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const chatNot = notifications?.filter(
      (not) => not?.senderId === recipientId
    );
    const unreadNot = chatNot?.filter((not) => not?.isRead === false);
    setNumOfUnreadNots(unreadNot.length);
  }, [notifications]);
  useEffect(() => {
    const chatLastMessage = allMessages?.filter(
      (msg) => msg.chatId === chat?._id
    );

    const chatLength = chatLastMessage?.length;

    // if (chatLength === chatLastMessage?.length) {
    if (chatLength) {
      const getLastMessage = chatLastMessage[chatLength - 1];

      setLastMessage(getLastMessage);
      // }
    }
    // const lengthOfLast = messages.length;
    // setLastMessage(messages[lengthOfLast - 1]);
    //setLastMessage(getLastMessage)
  }, [allMessages, messages]);

  return (
    <div className="flex justify-between cursor-pointer w-[450px] my-6 border-b-[.3px] border-[#AEAEAE] pb-1">
      <div className="flex gap-3">
        <div>
          <img className="w-[30px] h-[30px]" src={avatar} alt="profile-pic" />
        </div>
        <div>
          <div className="font-semibold">{recipientUser?.name}</div>
          <div className="font-light text-sm text-[#AEAEAE] ">
            {lastMessage?.text || "No message yet"}
          </div>
        </div>
      </div>
      <div className="flex flex-col relative">
        <div className="text-[#AEAEAE]  text-[11px]">
          {lastMessage?.text && moment(lastMessage?.createdAt).calendar()}
        </div>
        {NumOfUnreadNots > 0 && (
          <div className="rounded-full text-[12px] bg-[#34bf95] self-end w-[17px] h-[17px] text-center">
            {NumOfUnreadNots}
          </div>
        )}
        {onlineUsers.some((user) => user.userId === recipientUser?._id) && (
          <span className="bg-green-500 rounded-full absolute w-[8px] h-[8px] -top-[10px] -right-1 "></span>
        )}
      </div>
    </div>
  );
};
export default UserChat;
