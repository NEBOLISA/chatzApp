import { Routes, Route,  Navigate} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./components/chat/ChatBox";

function App() {
  
  const { user } = useContext(AuthContext);
 
  
  
  return (
  
      <div className="h-[90vh]  ">
        <ToastContainer />
        <Navbar />

        <div className="mx-auto h-[100%]   sm:w-[100%] lg:w-[95%] xl:w-3/4  w-3/4  ">
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />}></Route>
            <Route path="/login" element={user ? <Chat /> : <Login />}></Route>
            <Route
              path="/register"
              element={user ? <Chat /> : <Register />}
            ></Route>
            <Route path="/*" element={<Navigate to="/" />}></Route>
            <Route path="/chatbox" element={user && <ChatBox />}></Route>
          </Routes>
        </div>
      </div>
  
  );
}

export default App;
