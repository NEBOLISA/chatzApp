import { useContext, useEffect, useRef, useState } from "react";
import { ChatsContext } from "../contexts/ChatsContext";
import moment from "moment";
const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const [isHover, setIsHover] = useState(false);
  const {
    notifications,
    allUsers,
    setNotifications,
    updateNotification,
    updateCurrentChat,
    chats,
  } = useContext(ChatsContext);
  const notificationMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const unReadNotif = notifications?.filter((not) => not?.isRead === false);
  const clearNotifications = () => {
    notifications.map((not) =>
      not?.isRead === false ? updateNotification(not?.senderId) : ""
    );
    const clearedNot = notifications?.map((not) =>
      not?.isRead === false ? { ...not, isRead: true } : { ...not }
    );

    setNotifications([...clearedNot]);
  };
  const openChat = (senderId, receiverId) => {
    //console.log(senderId, receiverId);
    if (senderId && receiverId) {
      const chatToOpen = chats.find(
        (chat) =>
          chat?.members[0] === senderId && chat?.members[1] === receiverId //||
        //(chat?.members[0] === senderId && chat?.members[1] === receiverId)
      );
      //console.log(chatToOpen);
      updateCurrentChat(chatToOpen);
    }

    //console.log(chatToOpen);
  };
  return (
    <div ref={notificationMenuRef}>
      <div
        className="relative group"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chat-left-fill cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>
          {unReadNotif.length > 0 &&
            (unReadNotif.length > 99 ? (
              <span className="bg-[#34bf95] flex justify-center items-center rounded-full w-[27px] h-[27px]  absolute -right-5 -top-3 ">
                <span className="text-white text-[12px] font-normal ">
                  {unReadNotif.length}
                </span>
              </span>
            ) : (
              <span className="bg-[#34bf95] flex justify-center items-center rounded-full w-[20px] h-[20px]  absolute -right-3 -top-2 ">
                <span className="text-white text-[12px] font-normal ">
                  {unReadNotif.length}
                </span>
              </span>
            ))}
        </div>

        <div
          className="
          bg-slate-200 group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-all ease-in duration-70 z-20  -right-7 top-8 text-sm cursor pointer p-[6px] text-black rounded-lg absolute"
        >
          Notifications
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? "visible opacity-100 translate-y-0 transition duration-300 ease-in"
            : "invisible opacity-0 -translate-y-5 transition duration-300 ease-out "
        }transition-all  before:content-[''] before:-z-10 before:absolute before:-top-0 before:left-[60px] before:h-5 before:w-6 before:bg-white before:rotate-45 z-20 ease-in duration-70 bg-white text-gray-700 shadow-2xl w-[300px] absolute pb-2 top-12 right-44 rounded-xl`}
      >
        <div className="flex justify-between items-center p-3 ">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unReadNotif.length > 0 && (
            <p className="text-sm cursor-pointer" onClick={clearNotifications}>
              Mark All as read
            </p>
          )}
        </div>
        {unReadNotif.length > 0 ? (
          unReadNotif.map((not, index) => (
            <div
              className="p-2 cursor-pointer border-b-[.4px] transition-all duration-150 ease-in border-gray-400 hover:bg-[#d4d4d4] bg-[#ecebeb] mt-[2px]"
              key={index}
              onClick={() => openChat(not?.receiverId, not?.senderId)}
            >
              <p className="text-[12px] ">{`You have an unread message from ${
                allUsers.find((user) => user?._id === not?.senderId)?.name
              }`}</p>
              <p className="text-[10px] font-light">
                {moment(not.createdAt).calendar()}
              </p>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-sm my-3">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
};
export default Notification;
