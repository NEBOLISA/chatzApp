/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Alert from "../components/Alert";
import { AuthContext } from "../contexts/AuthContext";
import LoadingIcons from "react-loading-icons";

const Login = () => {
  const {
    user,
    updateLoginInfo,
    loginInfo,
    loginUser,
    isLoginLoading,
    loginError,
    setLoginError,
  } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const handleLoginUser = async (e) => {
    e.preventDefault();
    loginUser();
  };
  const closeAlert = () => {
    setLoginError(null);
  };
  return (
    <>
      <form onSubmit={handleLoginUser} className=" pt-[10%] w-[80%] mx-auto">
        <div className="w-[60%] mx-auto">
          <h2 className="text-xl mb-6">Login</h2>

          <div className="mb-3">
            <input
              className=" w-full focus:outline-none border focus:border-indigo-500 text-black rounded-sm p-1"
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              value={loginInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="w-full focus:outline-none border focus:border-indigo-500 text-black rounded-sm p-1"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={loginInfo.password}
              onChange={handleInputChange}
            />
          </div>

          <button className=" w-full flex items-center justify-center bg-blue-600 text-white text-sm rounded-sm py-1">
            {isLoginLoading ? (
              <LoadingIcons.Bars speed={1} width={20} height={20} />
            ) : (
              "Login"
            )}
          </button>
          {loginError?.error && (
            <Alert text={loginError?.message} closeAlert={closeAlert} />
          )}
        </div>
      </form>
    </>
  );
};
export default Login;
