import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ChatsContext } from "../contexts/ChatsContext";
import Notification from "./Notification";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setChats, setCurrentChat, setPotentialChats } =
    useContext(ChatsContext);

  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
    setChats(null);
    setCurrentChat(null);
    setPotentialChats(null);
  };
  return (
    <div
      className="bg-slate-950
    h-14 mb-4 relative "
    >
      <div className="mx-auto h-full items-center w-3/4 flex justify-between">
        <h2 className=" text-2xl">
          <Link to="/">ChatApp</Link>
        </h2>
        {user && (
          <span className="text-orange-300">
            Logged in as{" "}
            <span style={{ textTransform: "capitalize" }}>
              {user?.name.split(" ")[0]}
            </span>
          </span>
        )}
        <ul className="flex items-center justify-center gap-4">
          {user ? (
            <div className="flex items-center justify-center gap-8">
              <Notification />
              <li onClick={logout}>
                {" "}
                <Link to="/login">Logout</Link>
              </li>
            </div>
          ) : (
            <>
              <li>
                <Link to={"/login"}> Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
