/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import NoProfile from "../../assets/avatar.svg";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";

import { ChatsContext } from "../../contexts/ChatsContext";
import moment from "moment";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";
import { Navigate } from "react-router-dom";
// import { uploadUrl } from "../../utils/services";
/* eslint-disable react/prop-types */
const UserChat = ({
  chat,
  user,
  index,
  toggleChatDropDown,
  openChatIndices,
  dropDownRef,
  setOpenChatIndices,
  // handleNavigate
}) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const {
    onlineUsers,
    notifications,
    chats,
    newMessage,
    profilePictures,
     allUsers,
    setChatToDelete,
    setIsDeleteActionModalOpen,
  } = useContext(ChatsContext);
  const [NumOfUnreadNots, setNumOfUnreadNots] = useState(0);

  const { latestMessage, error } = useFetchLastMessage(chat);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const chatNot = notifications?.filter(
      (not) => not?.senderId === recipientId
    );
    const unreadNot = chatNot?.filter((not) => not?.isRead === false);
    setNumOfUnreadNots(unreadNot.length);
  }, [notifications]);
  const reduceTextSize = (text) => {
    let textToDisplay;
    if (text?.length > 20) {
      textToDisplay = `${text.substring(0, 20)}...`;
    } else {
      textToDisplay = text?.substring(0, 20);
    }

    return textToDisplay;
  };
  const handleDelete = (e, chatId) => {
    setChatToDelete(chatId);
    setIsDeleteActionModalOpen(true);
    setOpenChatIndices((prevIndices) =>
      prevIndices.map((isOpen) => (isOpen === true ? false : false))
    );
    e.stopPropagation();
  };
  // const handleNavigate = () => {
  //   Navigate("/chatbox");
  // };
  
  const findUserProfilePic = ()=>{
    const user = allUsers?.find((user) => user?._id === recipientId)
    const profilePic =  user?.profilePic
    return profilePic
  }
  return (
    <div
      // onClick={handleNavigate}
      className=" flex justify-between cursor-pointer relative   border-b-[.3px]  border-[#AEAEAE] h-[70px] py-2 px-2 hover:bg-[#e4e4e4] group"
    >
      {openChatIndices[index] === true && (
        <div
          className="bg-white  text-gray-600 z-30  w-[170px] 
      shadow-[-4px_-2px_14px_-2px_rgba(156,153,153,0.66)] absolute  top-6 right-2"
        >
          <ul>
            <li className="p-2 text-sm" onClick={(e) => handleDelete(e, chat)}>
              Delete chat
            </li>
          </ul>
        </div>
      )}
      <div className="flex gap-3 items-center">
        <div>
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={
             // allUsers.find((user) => user?._id === recipientId)
                findUserProfilePic()
                ? findUserProfilePic()
                // `${uploadUrl}/uploads/` +
                //   profilePictures.find((pic) => pic?.userId === recipientId)
                //     ?.fileName
                : NoProfile
            }
            alt="profile-pic"
          />
        </div>
        <div className="text-gray-800">
          <div className="font-semibold text-gray-800">
            {recipientUser?.name}
          </div>
          <div className="font-light text-sm text-[#383838] ">
            {reduceTextSize(newMessage?.text) ||
              (latestMessage?.text && reduceTextSize(latestMessage?.text))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2  relative ">
        <div className="text-[#AEAEAE] z-40 flex gap-2 mr-9 text-[11px]">
          {latestMessage?.text && moment(latestMessage?.createdAt).calendar()}
          <div
            ref={dropDownRef}
            onClick={(e) => toggleChatDropDown(index, e)}
            className="group-hover:opacity-100 absolute right-0 z-50 group-hover:visible opacity-0 invisible w-[30px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="black"
              className="bi bi-chevron-down font-bold"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
        </div>
        {NumOfUnreadNots > 0 && (
          <div className="rounded-full text-[12px] bg-[#34bf95] self-end w-[17px] h-[17px] text-center">
            {NumOfUnreadNots}
          </div>
        )}
        {onlineUsers.some((user) => user.userId === recipientUser?._id) && (
          <span className="bg-green-500 rounded-full absolute w-[8px] h-[8px] -top-[6px] right-[4px] "></span>
        )}
      </div>
    </div>
  );
};
export default UserChat;
