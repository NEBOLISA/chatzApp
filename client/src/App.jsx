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
  
 
  
  return (
    <div className='h-[90vh]  '>
      <ToastContainer />
      <Navbar />

      <div className='mx-auto h-[100%]   sm:w-[100%] lg:w-[95%] xl:w-3/4  w-3/4  '>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path='/chatbox'
            element={
              <ProtectedRoute>
                <ChatBox />
              </ProtectedRoute>
            }
          />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
// utils/ProtectedRoute.jsx



 const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? children : <Navigate to="/" replace />;
};
