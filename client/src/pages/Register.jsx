/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Alert from "../components/Alert";
import { AuthContext } from "../contexts/AuthContext";
import LoadingIcons from "react-loading-icons";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    isRegisterLoading,
    registerError,
    setRegisterError,
  } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    registerUser();
    // updateRegisterInfo({
    //   name: "",
    //   email: "",
    //   password: "",
    // });
  };
  const closeAlert = () => {
    setRegisterError(null);
  };
  return (
    <>
      <form className=" pt-[10%] w-[80%] mx-auto" onSubmit={handleSubmit}>
        <div className="w-[60%] mx-auto">
          <h2 className="text-xl mb-6">Register</h2>
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
          <div className="mb-3">
            <input
              className="w-full focus:outline-none border focus:border-indigo-500 text-black rounded-sm p-1"
              type="password"
              placeholder="Password"
              value={registerInfo.password}
              name="password"
              id="password"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className=" w-full  flex items-center justify-center bg-blue-600 text-white text-sm rounded-sm py-1"
          >
            {isRegisterLoading ? (
              <LoadingIcons.Bars speed={1} width={20} height={20} />
            ) : (
              "Register"
            )}
          </button>
          {registerError?.message && (
            <Alert text={registerError?.message} closeAlert={closeAlert} />
          )}
        </div>
      </form>
    </>
  );
};
export default Register;
