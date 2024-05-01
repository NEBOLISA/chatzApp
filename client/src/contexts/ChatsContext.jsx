/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  baseUrl,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/services";
import { AuthContext } from "./AuthContext";

import "react-toastify/dist/ReactToastify.css";
export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [chatsError, setChatsError] = useState(null);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [chats, setChats] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(null);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [newChat, setNewChat] = useState(null);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationMessageError, setNotificationMessageError] =
    useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePictures, setProfilePictures] = useState([]);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [isDeleteActionModalOpen, setIsDeleteActionModalOpen] = useState(false);
  const [changedName, setChangedName] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [deleteErrorResponse, setDeleteErrorResponse] = useState(null);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isNameChangeLoading, setIsNameChangeLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [isNameChangeError, setIsNameChangeError] = useState("");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isChangePicModalOpen, setIsChangePicModalOpen] = useState(false);
  const changePicItemRef = useRef(null);
  const modalMenuItemRef = useRef(null);
  const respModalChangePicItemRef = useRef(null);
  const respModalMenuItemRef = useRef(null);
  useEffect(() => {
    const newSocket = io("https://chatzapp-2-socket.onrender.com");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  useEffect(() => {
    setChangedName(user?.name);
  }, [isEditNameModalOpen]);
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId, newChat });
    //console.log(chats);
  }, [newMessage]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      // if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);

      const isChatCreated = chats.find(
        (chat) =>
          (chat?.members[0] === res.receiverId &&
            chat?.members[1] === res.senderId) ||
          (chat?.members[0] === res.senderId &&
            chat?.members[1] === res.receiverId)
      );
      if (isChatCreated) {
        return;
      } else {
        setChats((prev) => [...prev, res.newChat]);
      }
      //setChats((prev) => [...prev, ...res.chats]);
      // if (isChatCreated) {
      //   sendMessage(
      //     res.text,
      //     res.receiverId,
      //     res.chatId,
      //     undefined,
      //     res.senderId,
      //     false
      //   );
      //   return;
      // } else {
      //   createChat(res.receiverId, res.senderId);

      //   sendMessage(
      //     res.text,
      //     res.receiverId,
      //     // isChatCreated?._id,
      //     res.chatId,
      //     undefined,
      //     res.senderId,
      //     false
      //   );
      // }
      //console.log(res);
      // const isChatCreated = chats.find(
      //   (chat) =>
      //     chat?.members[0] === res.receiverId &&
      //     chat?.members[1] === res.senderId
      // );
      // if (isChatCreated) {
      //   return;
      // } else {
      //   createChat(res.receiverId, res.senderId);
      // }
    });
    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some(
        (id) => id === res?.senderId
      );

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
      //  const isChatCreated = chats.find(
      //    (chat) =>
      //      chat?.members[0] === res.receiverId &&
      //      chat?.members[1] === res.senderId
      //  );
      //   if (isChatCreated) {
      //     return;
      //   } else {
      //     createChat(res.receiverId, res.senderId);
      //   }
      // if(chats){
      //   return
      // }else{
      //   createChat()
      // }
      // const isChatCreated = chats.find(
      //   (chat) =>
      //     (chat?.members[0] === res.receiverId &&
      //       chat?.members[1] === res.senderId) ||
      //     (chat?.members[0] === res.senderId &&
      //       chat?.members[1] === res.receiverId)
      // );
      // const isUserChatCreated = chats.find(
      //   (chat) =>
      //     chat?.members[0] === res.senderId &&
      //     chat?.members[1] === res.receiverId
      // );
      // const isReceiverChatCreated = chats.find(
      //   (chat) =>
      //     chat?.members[0] === res.receiverId &&
      //     chat?.members[1] === res.senderId
      // );
      // if (isUserChatCreated) {
      //   return;
      // } else {
      //   createChat(res.senderId, res.receiverId);
      // }
      // if (isReceiverChatCreated) {
      //   return;
      // } else {
      //   createChat(res.receiverId, res.senderId);
      // }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat, chats, messages]);
  // fetch notifications
  useEffect(() => {
    const getNotifications = async () => {
      const response = await getRequest(
        `${baseUrl}/notifications/${user?._id}`
      );

      if (response.error) {
        return console.error(response.message);
      }
      if (user?._id) setNotifications((prev) => [...prev, ...response]);
    };

    getNotifications();
  }, [user]);

  useEffect(() => {
    const getChats = async () => {
      setIsChatsLoading(true);
      setChatsError(null);
      const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

      setIsChatsLoading(false);
      if (response.error) {
        return setChatsError(response.message);
      }
      setChats(response);
    };
    if (user?._id) {
      getChats();
    }
  }, [user]);

  const updateCurrentChat = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?.members[0]}/${currentChat?.members[1]}/${user?._id}`
      );

      setIsMessagesLoading(false);
      if (response.error) {
        return setMessagesError(response.message);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const updateNotification = async (senderId) => {
    const response = await putRequest(
      `${baseUrl}/notifications`,
      JSON.stringify({
        senderId,
        isRead: true,
      })
    );
    if (response.error) {
      return setNotificationMessageError(response);
    }
  };
  useEffect(() => {
    const currentlyOpenId = currentChat?.members.find((id) => id !== user?._id);
    if (currentlyOpenId && notifications.length > 0) {
      if (notifications) {
        const newArray = notifications?.map((not) =>
          not?.senderId === currentlyOpenId
            ? { ...not, isRead: true }
            : { ...not }
        );

        messages?.length > 0 && setNotifications([...newArray]);
      }
      updateNotification(currentlyOpenId);
    }
  }, [currentChat, messages]);
  useEffect(() => {
    const getPotentialUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetching users", response);
      }

      let filteredUsers = [];
      filteredUsers = await response.filter((User) => {
        let isChatCreated;
        if (user?._id === User?._id) return false;
        if (chats) {
          isChatCreated = chats?.some(
            (chat) =>
              chat?.members[0] === User?._id || chat?.members[1] === User?._id
          );
        }
        return !isChatCreated;
      });
      setAllUsers(response);
      setPotentialChats(filteredUsers);
    };

    getPotentialUsers();
  }, [chats]);
  useEffect(() => {
    const getAllPics = async () => {
      const response = await getRequest(`${baseUrl}/uploads/`);
      if (response.error) {
        return console.log("Error fetching pictures", response);
      }
      setProfilePictures(response);
    };
    getAllPics();
  }, [potentialChats]);

  useEffect(() => {
    const getProfilePic = async () => {
      const response = await getRequest(`${baseUrl}/uploads/${user?._id}`);

      if (response?.error) {
        return console.log("Error fetching users", response);
      }
      setProfilePic(response);
    };

    getProfilePic();
  }, [user, potentialChats]);
  const handleOpenModal = useCallback(() => {
    setIsEditNameModalOpen(true);
  }, [isEditNameModalOpen]);

  const sendMessage = useCallback(
    async (
      textMessage,
      senderId,
      currentChatId,
      setTextMessage = "",
      receiverId,
      isRead
    ) => {
      if (!textMessage) return console.log("You must type something...");
      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: senderId,
          text: textMessage,
          receiverId,
        })
      );

      const response2 = await postRequest(
        `${baseUrl}/notifications`,
        JSON.stringify({
          senderId,
          receiverId,
          isRead,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }
      if (response2.error) {
        return setNotificationMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);

      setTextMessage("");
    },
    []
  );
  //get user notification
  const createChat = useCallback(async (userId, recipientId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        userId,
        recipientId,
      })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setNewChat(response);
    setChats((prev) => [...prev, response]);
  }, []);

  const deleteChat = useCallback(
    async (chat) => {
      setIsDeleteLoading(true);

      const response = await putRequest(
        `${baseUrl}/chats/${user?._id}/${chat?._id}`
      );
      if (response.status === 200) {
        setIsDeleteLoading(false);
        toast.success("Chat successfully deleted", { autoClose: 1000 });
        console.log(chats);
        const mChats = chats?.filter(
          (singlechat) => singlechat?._id !== chat?._id
        );
        console.log(mChats);

        setChats([...mChats]);
      }
      setIsDeleteActionModalOpen(false);
      if (response?.error) {
        setIsDeleteLoading(false);
        toast.error("Error deleting chat, try again", { autoClose: 1000 });
        setIsDeleteActionModalOpen(false);
        return console.error(response.message);
      }
    },
    [chats]
  );
  const handleNameUpdate = useCallback(async (name, userId) => {
    setIsNameChangeLoading(true);

    const response = await putRequest(
      `${baseUrl}/users`,
      JSON.stringify({
        changedName: name,
        userId,
      })
    );
    if (response.status === 200) {
      toast.success("Name successfully updated", { autoClose: 1000 });
      setIsNameChangeLoading(false);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response));
      setIsEditNameModalOpen(false);
    }
    if (response.error) {
      setIsNameChangeLoading(false);
      toast.error("Error changing name, try again", { autoClose: 1000 });
      setIsEditNameModalOpen(false);
      return setIsNameChangeError(response);
    }
  }, []);
  const handleMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
    setChats(null);
    setCurrentChat(null);
    setPotentialChats(null);
  };
  return (
    <ChatsContext.Provider
      value={{
        chats,
        isChatsLoading,
        chatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        setCurrentChat,
        sendMessage,
        sendTextMessageError,
        setChats,
        socket,
        onlineUsers,
        setMessages,
        setPotentialChats,
        notifications,

        allUsers,
        setNotifications,
        updateNotification,
        profilePic,
        profilePictures,
        handleOpenModal,
        isEditNameModalOpen,
        setIsEditNameModalOpen,
        changedName,
        setChangedName,
        modalMenuItemRef,
        deleteChat,
        deleteResponse,
        deleteErrorResponse,

        setIsDeleteActionModalOpen,
        isDeleteActionModalOpen,
        chatToDelete,
        setChatToDelete,
        isNameChangeLoading,
        isNameChangeError,
        handleNameUpdate,
        isDeleteLoading,
        isSideMenuOpen,
        setIsSideMenuOpen,
        handleMenuToggle,
        logout,
        respModalMenuItemRef,
        isChangePicModalOpen,
        setIsChangePicModalOpen,
        changePicItemRef,
        respModalChangePicItemRef,
        setProfilePic,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
