import { useContext } from "react";
import { ChatsContext } from "../../contexts/ChatsContext";
import { AuthContext } from "../../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, isChatsLoading, createChat, onlineUsers } =
    useContext(ChatsContext);

  if (isChatsLoading)
    return (
      <div className="flex mb-9 ">
        <Skeleton
          count={4}
          style={{
            width: "100px",
            height: "20px",
            marginLeft: "15px",
          }}
          inline={true}
        />
        {/* <Skeleton style={{  width: "70px" }} inline={true} /> */}
      </div>
    );
  return (
    <div className="flex gap-3 mb-5 flex-wrap cursor-pointer">
      {potentialChats?.map((u, index) => (
        <div
          key={index}
          className="flex bg-[#17adb0] rounded-md p-1 relative"
          onClick={() => createChat(user._id, u?._id)}
        >
          {u?.name}{" "}
          <span
            key={index}
            className={`${
              onlineUsers.some((user) => user?.userId === u?._id)
                ? "bg-green-500"
                : "bg-slate-500"
            } rounded-full w-[8px] h-[8px] absolute -top-1 right-0  `}
          ></span>
        </div>
      ))}
    </div>
  );
};
export default PotentialChats;
