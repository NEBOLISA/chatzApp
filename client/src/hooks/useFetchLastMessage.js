import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatsContext } from "../contexts/ChatsContext";
import { AuthContext } from "../contexts/AuthContext";

export const useFetchLastMessage = (chat) => {
  const { newMessage, messages, notifications } = useContext(ChatsContext);
  const { user } = useContext(AuthContext);

  const [latestMessage, setLatestMessage] = useState(() =>
    messages && messages.length > 0 ? messages[messages.length - 1] : null
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipient = async () => {
      const response = await getRequest(
        `${baseUrl}/messages/${chat?.members[0]}/${chat?.members[1]}/${user?._id}`
      );

      if (response.error) {
        return setError(response.message);
      }
      const lastMessage = response[response?.length - 1];
      setLatestMessage(lastMessage);
    };
    if (chat) {
      getRecipient();
    }
  }, [notifications, newMessage]);

  return { latestMessage, error };
};
