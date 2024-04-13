/* eslint-disable react/prop-types */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ChatBoxSkeleton = ({ count }) => {
  let num = Array(count).fill(0);
  console.log(num.map((num, index) => (index % 2 === 0 ? num : "")));
  return (
    <div className="w-[80%]  animate-pulse rounded-lg bg-[#aaaaaa]  h-[60vh]">
      <Skeleton style={{ padding: "8px" }} />
      <div className="flex flex-col ">
        {num.map((_, i) =>
          i % 2 === 0 ? (
            <Skeleton
              key={i}
              style={{
                padding: "8px",
                marginTop: "15px",
                width: "100px",
                height: "50px",
                marginLeft: "12px",
              }}
            />
          ) : (
            <Skeleton
              containerClassName="right"
              key={i}
              style={{
                padding: "8px",
                marginTop: "32px",
                width: "100px",
                height: "50px",
                marginLeft: "auto",
                marginRight: "12px",
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
export default ChatBoxSkeleton;
