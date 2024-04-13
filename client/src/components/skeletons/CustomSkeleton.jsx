import placeholder from "../../assets/icons/placeholder.png";
const CustomSkeleton = ({ size }) => {
  let num = Array(size).fill(0);
  console.log(num);

  return num.map((_, i) => (
    <div className=" w-[350px]  animate-pulse  my-6 " key={i}>
      <div className="flex gap-3 w-[100%] ">
        <div className="animate-pulse">
          <img
            className="rounded-full object-cover w-[32px] h-[30px] "
            src={placeholder}
            alt="/"
          />
        </div>
        <div className="w-[100%]">
          <div className="flex justify-between">
            <div className="w-[100%]">
              <div className="font-semibold h-[10px] w-[80px] bg-gray-300 rounded-full mb-2"></div>
            </div>
            <div className="flex flex-col relative">
              <div className=" h-[6px] w-[30px] bg-gray-300 rounded-full  text-sm"></div>
            </div>
          </div>
          <div className="font-light h-[7px] w-[100%]  bg-gray-300 rounded-full  text-sm text-[#AEAEAE] "></div>
        </div>
      </div>
    </div>
  ));
};
export default CustomSkeleton;
