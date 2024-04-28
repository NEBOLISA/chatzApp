import { useContext } from "react";
import { ChatsContext } from "../../contexts/ChatsContext";
import { AuthContext } from "../../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import NoProfile from "../../assets/avater2.png";
const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const {
    potentialChats,
    isChatsLoading,
    createChat,
    onlineUsers,

    profilePictures,
  } = useContext(ChatsContext);

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
    <div className="flex gap-3 pt-3 bg-[white] w-full items-center px-2 mb-5 cursor-pointer mt-[20px]">
      <div className="flex gap-3  h-[100px]  overflow-x-scroll w-max px-2  cursor-pointer">
        {potentialChats?.length > 0 ? (
          potentialChats?.map((u, index) => (
            <div
              key={index}
              className="flex bg-[#17adb0] w-full self-center rounded-md p-1 relative"
              onClick={() => createChat(user._id, u?._id)}
            >
              <img
                className=" w-[40px] h-[40px] rounded-full object-cover absolute -left-2 -top-8"
                src={
                  profilePictures.find((pic) => pic?.userId === u?._id)
                    ?.fileName
                    ? `http://localhost:5000/uploads/` +
                      profilePictures.find((pic) => pic?.userId === u?._id)
                        ?.fileName
                    : NoProfile
                }
                alt="profilePic"
              />
              <p className="w-max">{u?.name} </p>

              <span
                key={index}
                className={`${
                  onlineUsers.some((user) => user?.userId === u?._id)
                    ? "bg-green-500"
                    : "bg-slate-500"
                } rounded-full w-[8px] h-[8px] absolute -top-1 right-0  `}
              ></span>
            </div>
          ))
        ) : (
          <p className="flex text-gray-600 w-lvw justify-center items-center">
            No available chats
          </p>
        )}
      </div>
    </div>
  );
};
export default PotentialChats;
