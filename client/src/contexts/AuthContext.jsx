/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

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

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
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
    setisRegisterLoading(false);
    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
