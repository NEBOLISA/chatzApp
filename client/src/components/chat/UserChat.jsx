/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import avatar from "../../assets/avatar.svg";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";

import { ChatsContext } from "../../contexts/ChatsContext";
import moment from "moment";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";
/* eslint-disable react/prop-types */
const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers, notifications } = useContext(ChatsContext);
  const [NumOfUnreadNots, setNumOfUnreadNots] = useState(0);

  const { latestMessage, error } = useFetchLastMessage(chat);
  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const chatNot = notifications?.filter(
      (not) => not?.senderId === recipientId
    );
    const unreadNot = chatNot?.filter((not) => not?.isRead === false);
    setNumOfUnreadNots(unreadNot.length);
  }, [notifications]);
  const reduceTextSize = (text) => {
    let textToDisplay;
    if (text.length > 20) {
      textToDisplay = `${text.substring(0, 20)}...`;
    } else {
      textToDisplay = text.substring(0, 20);
    }

    return textToDisplay;
  };

  return (
    <div className="flex justify-between cursor-pointer w-[450px] my-6 border-b-[.3px] border-[#AEAEAE] pb-1">
      <div className="flex gap-3">
        <div>
          <img className="w-[30px] h-[30px]" src={avatar} alt="profile-pic" />
        </div>
        <div>
          <div className="font-semibold">{recipientUser?.name}</div>
          <div className="font-light text-sm text-[#AEAEAE] ">
            {latestMessage?.text && reduceTextSize(latestMessage?.text)}
          </div>
        </div>
      </div>
      <div className="flex flex-col relative">
        <div className="text-[#AEAEAE]  text-[11px]">
          {latestMessage?.text && moment(latestMessage?.createdAt).calendar()}
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
