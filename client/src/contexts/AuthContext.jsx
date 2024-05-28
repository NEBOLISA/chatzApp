/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";

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
    profilePic:""
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
 const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setRegisterInfo((prev) => ({ ...prev, profilePic: reader.result }));
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

  

  const registerUser = useCallback(async () => {
    setisRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    );

  

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
      JSON.stringify(loginInfo),
      "include"
    );
    setisLoginLoading(false);
    if (response.error) {
      return setLoginError(response);
    }
    localStorage.setItem("user", JSON.stringify(response));
    if(response.login){
 setUser(response);
    }else{
      navigate("/login")
    }
   
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
