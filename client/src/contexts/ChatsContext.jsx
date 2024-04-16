/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import {
  baseUrl,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/services";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
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
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationMessageError, setNotificationMessageError] =
    useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

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
    // const chat = chats.find((chat) => chat?._id === newMessage?.chatId);

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // receive message

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
      setAllMessages((prev) => [...prev, res]);
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
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);
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
  }, [user?._id]);

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
        `${baseUrl}/messages/${currentChat?._id}`
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
      filteredUsers = response.filter((User) => {
        let isChatCreated = false;
        if (user?._id === User?._id) return false;
        if (chats) {
          isChatCreated = chats?.some(
            (chat) =>
              chat.members[0] === User?._id || chat.members[1] === User?._id
          );
        }
        return !isChatCreated;
      });
      setAllUsers(response);
      if (filteredUsers.length < response.length - 1)
        setPotentialChats(filteredUsers);
    };

    getPotentialUsers();
  }, [chats, user]);

  const sendMessage = useCallback(
    async (
      textMessage,
      senderId,
      currentChatId,
      setTextMessage,
      receiverId
    ) => {
      if (!textMessage) return console.log("You must type something...");
      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: senderId,
          text: textMessage,
        })
      );
      const response2 = await postRequest(
        `${baseUrl}/notifications`,
        JSON.stringify({
          senderId,
          receiverId,
          isRead: false,
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
      //setNotifications(response2)
      setTextMessage("");
    },
    []
  );
  //get user notification
  useEffect(() => {}, []);
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setChats((prev) => [...prev, response]);
  }, []);

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
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
