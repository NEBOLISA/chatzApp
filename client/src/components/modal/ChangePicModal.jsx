/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { ChatsContext } from "../../contexts/ChatsContext";
import { AuthContext } from "../../contexts/AuthContext";
import { baseUrl, postFileRequest, postRequest, putRequest } from "../../utils/services";
import LoadingIcons from "react-loading-icons";
const ChangePicModal = () => {
  const {setUser} = useContext(AuthContext)
  const {
    isChangePicModalOpen,
    changePicItemRef,
    setIsChangePicModalOpen,
    respModalChangePicItemRef,
    setProfilePic,
  } = useContext(ChatsContext);

  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [successResponse, setIsSuccessResponse] = useState(null);
  const [uploadError, setIsUploadError] = useState(null);
  const inputRef = useRef(null);
  const changePicRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        changePicRef.current &&
        !changePicRef.current.contains(event.target)
      ) {
        setIsChangePicModalOpen(false);
        setFile(null);
        setImagePreview(null);

        if (
          changePicItemRef.current === event.target ||
          respModalChangePicItemRef.current === event.target
        ) {
          setIsChangePicModalOpen(true);
        }
      } else {
        setIsChangePicModalOpen(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleDrag = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
       
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = async () => {
    setFileUploadLoading(true);
   
    //formData.append("userId", user?._id);
    if (file) {
      const response = await putRequest(
        `${baseUrl}/users/${user?._id}`,
        JSON.stringify({ userPicture:imagePreview}),
        "include"
      );

      if (response.error) {
        setFileUploadLoading(false);
        setTimeout(() => {
          setIsUploadError(null);
        }, 3000);
        return setIsUploadError(response.message);
      }

      if (response.data) {
        setProfilePic(response?.data?.profilePic);
         localStorage.setItem("user", JSON.stringify(response.data));
        setFileUploadLoading(false);
        setIsSuccessResponse(response.message);
        setTimeout(() => {
          setIsSuccessResponse(null);
        }, 3000);
      }
    }
  };
  const truncateText = (text) => {
    if (text.length > 30) {
      const extension = text.split(".");
      const extLength = extension.length;
      const ext =
        extension.length > 1 ? extension[extLength - 1] : extension[0];
      return text.slice(0, 30) + " ....." + `.${ext}`;
    } else {
      return text;
    }
  };
  return (
    <div
      className={`${
        isChangePicModalOpen ? "visible opacity-100" : "invisible opacity-0 "
      }  flex justify-center h-[100vh] items-center absolute top-0 left-0 right-0 bottom-0 bg-gray-700/50 z-[100]`}
    >
      <div
        ref={changePicRef}
        className={`${
          isChangePicModalOpen
            ? "visible opacity-100 translate-y-0 transition duration-300 ease-in "
            : "invisible opacity-0 -translate-y-5 transition duration-300 ease-out"
        } transition-all ease-in duration-70 sm:h-[68%] lg:h-[450px] sm:w-[90%] lg:w-[500px] p-6 bg-white  rounded-md`}
      >
        <div
          className="text-black sm:h-[320px] lg:h-[350px] w-full border-dashed border-black border-[3px] flex flex-col  justify-center items-center"
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto flex flex-col justify-center items-center">
            <div className="flex justify-center items-center relative">
              <div className={`${imagePreview ? "block" : "hidden"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  className="bi bi-x-circle-fill text-white absolute -top-[14px] left-[46%] cursor-pointer "
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setFile(null);
                    setImagePreview(null);
                  }}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </div>

              {file && (
                <img
                  className="w-[100px] h-[100px] object-cover  rounded-full border-[.5px] border-gray-500"
                  src={imagePreview}
                  alt="selectedImage"
                />
              )}
            </div>
            <span className="text-gray-600">
              {" "}
              {file ? truncateText(file.name) : "No file choosen"}
            </span>

            <h1 className="md:text-2xl text-black sm:text-sm text-center">
              Drag and Drop Image to Upload
            </h1>
            <h1 className="text-2xl text-black mt-6 mb-2">Or</h1>
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              id="image"
              onChange={(e) => handleFileChange(e)}
            />

            <button
              onClick={() => inputRef.current.click()}
              className="bg-gray-200 border-slate-400 border-[.5px] hover:bg-slate-300 px-2 py-2"
            >
              Select Image
            </button>
          </div>
          {successResponse && (
            <div className="flex justify-center items-center gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#c8e6c9"
                    d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                  ></path>
                  <polyline
                    fill="none"
                    stroke="#4caf50"
                    strokeMiterlimit="10"
                    strokeWidth="4"
                    points="14,24 21,31 36,16"
                  ></polyline>
                </svg>
              </div>
              <p className="text-bg text-green-300">
                Image successfully uploaded
              </p>
            </div>
          )}
          {uploadError && (
            <div className="flex justify-center items-center">
              <p className="text-lg text-red-300">{uploadError}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center cursor-pointer items-center  w-full mt-5">
          <button
            onClick={handleUpload}
            className="bg-slate-600 hover:bg-slate-500 px-2 py-2 rounded-sm "
          >
            {fileUploadLoading === true ? (
              <LoadingIcons.Bars speed={1} width={20} height={20} />
            ) : (
              "Upload Picture"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangePicModal;
