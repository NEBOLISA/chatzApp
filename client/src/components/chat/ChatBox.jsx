/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatsContext } from "../../contexts/ChatsContext";

import Alert from "../Alert";
import moment from "moment";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ handleBackToChats }) => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    isMessagesLoading,
    messagesError,
    sendMessage,
    newMessage,
    allUsers,
  
    sendTextMessageError,
  } = useContext(ChatsContext);

  const [textMessage, setTextMessage] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
 
  const scrollRef = useRef();
  const recipientId = currentChat?.members.find((id) => id !== user?._id);

 const recipUser = allUsers.find((user) => user?._id === recipientId);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentChat]);
  useEffect(() => {
    if (textMessage.length > 0) setBtnDisabled(false);
    else {
      setBtnDisabled(true);
    }
  }, [textMessage,newMessage]);
 
  if (messagesError) {
    return (
      <p className="text-center w-[100%]">
        <Alert text={messagesError} />
      </p>
    );
  }
  


  return (
    <div className="w-[100%] chatbox    lg:h-[100%] relative bg-[#cccdd5] rounded-lg    flex flex-col justify-between ">
      <div className=" flex overflow-y-hidden flex-col ">
        <div className=" bg-[#e7e7e7] relative text-gray-600 text-center p-2 rounded-tl-lg rounded-tr-lg">
          <strong>
            {isMessagesLoading ? "Loading.." : recipUser?.name}
          </strong>
          <div
            onClick={handleBackToChats}
            className="lg:hidden absolute left-3 top-[50%] -translate-y-[50%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </div>
        </div>
        <div className="  relative flex-1 flex flex-col overflow-y-scroll ">
          {messages &&
            messages?.map((message, index) => (
              <div
                key={index}
                ref={scrollRef}
                className={`${
                  message?.senderId === user?._id ? " self-end " : " "
                } p-3 max-w-fit flex flex-col `}
              >
                <div
                  key={index}
                  className={`${
                    message?.senderId === user?._id
                      ? "bg-[#00bd9b] self-end "
                      : " bg-white text-gray-600"
                  } p-3 rounded-[5px] max-w-fit   flex flex-col mt-8 font-light text-md mx-3`}
                >
                  <span className="">{message?.text}</span>
                  <span className="text-[12px]">
                    {moment(message.createdAt).calendar()}
                  </span>
                </div>
                <div className=" self-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="blue"
                    className="bi bi-check-all"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(
            textMessage,
            user?._id,
            currentChat,
            setTextMessage,
            recipientId,
            false
          );
        }}
        className="bg-[#e7e7e7]   p-2 flex gap-2 items-center  "
      >
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
        />
        {sendTextMessageError && (
          <p className="text-center flex justify-center items-center text-red-300">
            {sendTextMessageError}
          </p>
        )}
        <button
          disabled={btnDisabled}
          className={`${
            btnDisabled === true ? "bg-gray-500" : "bg-blue-500 "
          } rounded-full  w-[30px]  h-[30px] flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={`${btnDisabled ? "#999999" : "white"}`}
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default ChatBox;
