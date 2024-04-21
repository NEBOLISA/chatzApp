import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="  ">
        <ToastContainer />
        <Navbar />

        <div className="mx-auto w-3/4    ">
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />}></Route>
            <Route path="/login" element={user ? <Chat /> : <Login />}></Route>
            <Route
              path="/register"
              element={user ? <Chat /> : <Register />}
            ></Route>
            <Route path="/*" element={<Navigate to="/" />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
