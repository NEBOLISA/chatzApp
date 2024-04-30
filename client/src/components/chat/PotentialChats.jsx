/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ChatsContext } from "../../contexts/ChatsContext";
import { AuthContext } from "../../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import NoProfile from "../../assets/avater2.png";
const PotentialChats = ({ isActive }) => {
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
    <div
      className={`sm:${
        isActive === "potentialChats" ? "flex " : "hidden"
      }  lg:flex sm:pt-0 gap-3 pt-3 h-full bg-[white] w-full lg:items-center lg:px-2 mb-5 cursor-pointer `}
    >
      <div
        className="sm:flex sm:flex-col
       sm:w-full  sm:h-[75vh] sm:py-6 sm:gap-3   lg:flex-row lg:flex gap-3  lg:h-[100px]  overflow-x-scroll w-max px-2  cursor-pointer"
      >
        {potentialChats?.length > 0 ? (
          potentialChats?.map((u, index) => (
            <div
              key={index}
              className="lg:mt-3 sm:self-start  sm:py-2 sm:flex sm:items-center sm:gap-2 flex  bg-[#17adb0] w-full self-center rounded-md p-1 relative"
              onClick={() => createChat(user._id, u?._id)}
            >
              <img
                className=" w-[40px] h-[40px] sm:block rounded-full object-cover lg:absolute lg:-left-2 lg:-top-8"
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
