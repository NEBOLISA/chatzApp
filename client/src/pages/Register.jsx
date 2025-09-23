/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Alert from "../components/Alert";
import { AuthContext } from "../contexts/AuthContext";
import LoadingIcons from "react-loading-icons";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    isRegisterLoading,
    registerError,
    setRegisterError,
    handleFileChange,
    removeImage,
    imagePreview,
    selectedFile,
  } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
   
  };
 const truncateText = (text, textSize) => {
   if (text.length > textSize) {
     const extension = text.split(".");
     const extLength = extension.length;
     const ext = extension.length > 1 ? extension[extLength - 1] : extension[0];
     return text.slice(0, textSize) + " ....." + `.${ext}`;
   } else {
     return text;
   }
 };
  const handleSubmit = (event) => {
    event.preventDefault();

    registerUser();
  };
  useEffect(() => {
    if (
      registerInfo.name.length > 0 &&
      registerInfo.password.length > 0 &&
      registerInfo.email.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [registerInfo]);
  const closeAlert = () => {
    setRegisterError(null);
  };
  return (
    <>
      <form
        className=" pt-[10%] flex justify-center items-center h-[80vh] w-[80%] mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="xsm:w-[80%] lg:w-[60%] mx-auto">
          <h2 className="text-xl mb-6 text-black">Register</h2>
          <div className="mb-3">
            <input
              className=" focus:outline-none border focus:border-indigo-500 text-black w-full rounded-sm p-1"
              type="text"
              value={registerInfo.name}
              placeholder="Name"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              className=" w-full focus:outline-none border focus:border-indigo-500 text-black rounded-sm p-1"
              type="text"
              value={registerInfo.email}
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 relative">
            <input
              className="w-full  focus:outline-none border focus:border-indigo-500 text-black rounded-sm p-1"
              type={`${isPasswordVisible ? "text" : "password"}`}
              placeholder="Password"
              value={registerInfo.password}
              name="password"
              id="password"
              onChange={handleInputChange}
            />

            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000000"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="bi bi-eye absolute right-1 top-2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000000"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="bi bi-eye-slash absolute right-1 top-2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            )}
          </div>
          <input
            className="hidden "
            type="file"
            id="profile"
            placeholder="select profile pic"
            onChange={handleFileChange}
          />

          <div className="flex gap-3 items-center">
            <label
              htmlFor="profile"
              className="cursor-pointer bg-blue-600 p-2 "
            >
              Select a Profile Picture
            </label>
            <span className="text-gray-600">
              {" "}
              {selectedFile ? truncateText(selectedFile.name,20) : "No file choosen"}
            </span>
          </div>

          <div className="flex justify-center relative mt-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected File"
                className="w-[100px] h-[100px] border-gray-500 border object-cover rounded-full"
              />
            )}
            {imagePreview && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-x-circle-fill text-white absolute -top-[14px] cursor-pointer "
                viewBox="0 0 16 16"
                onClick={removeImage}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
            )}
          </div>
          <button
            disabled={btnDisabled}
            type="submit"
            className={` ${
              btnDisabled === true ? "bg-gray-500" : "bg-blue-500 "
            } w-full  flex items-center justify-center bg-blue-600 text-white text-sm rounded-sm py-1 mt-3`}
          >
            {isRegisterLoading && !registerError?.message ? (
              <LoadingIcons.Bars speed={1} width={20} height={20} />
            ) : (
              "Register"
            )}
          </button>
          {registerError?.message && (
            <Alert text={registerError?.message} closeAlert={closeAlert} />
          )}
          <p className="text-gray-600">
            Already registered{" "}
            <span className="text-blue-500 underline cursor-pointer">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </form>
    </>
  );
};
export default Register;
