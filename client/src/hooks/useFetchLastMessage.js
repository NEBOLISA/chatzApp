import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatsContext } from "../contexts/ChatsContext";

export const useFetchLastMessage = (chat) => {
  const [latestMessage, setLatestMessage] = useState(null);
  const { messages, notifications } = useContext(ChatsContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipient = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
      if (response.error) {
        return setError(response.message);
      }
      const lastMessage = response[response?.length - 1];
      setLatestMessage(lastMessage);
    };
    getRecipient();
  }, [notifications, messages]);

  return { latestMessage, error };
};
