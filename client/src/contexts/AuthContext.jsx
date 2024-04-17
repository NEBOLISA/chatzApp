/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postFileRequest, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setisRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setisLoginLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  //const [formData, setFormData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);
  const formData = new FormData();
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];

      // console.log(user?._id);
      // newFormData.append("image", file);
      //   newFormData.append("userId", "123456");
      // setFormData(newFormData);
      setSelectedFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [user]
  );

  const removeImage = useCallback(() => {
    setSelectedFile(null);
    setImagePreview(null);
  }, []);
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // formData.forEach((value, key) => {
  //   console.log("form", key, value);
  // });

  const registerUser = useCallback(async () => {
    setisRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    );

    formData.append("image", selectedFile);
    formData.append("userId", response?._id);

    if (selectedFile) {
      const response2 = await postFileRequest(`${baseUrl}/uploads`, formData);
      if (response2.error) {
        return console.log(response2);
      } else {
        console.log(response2);
      }
      setisRegisterLoading(false);
    }

    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo, selectedFile]);
  const loginUser = useCallback(async () => {
    setisLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    );
    setisLoginLoading(false);
    if (response.error) {
      return setLoginError(response);
    }
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        isRegisterLoading,
        registerError,
        setRegisterError,
        updateLoginInfo,
        loginInfo,
        loginUser,
        isLoginLoading,
        loginError,
        setLoginError,
        handleFileChange,
        removeImage,
        imagePreview,
        selectedFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
