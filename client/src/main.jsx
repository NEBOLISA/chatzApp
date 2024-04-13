import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ChatsContextProvider } from "./contexts/ChatsContext.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatsContextProvider>
        <SkeletonTheme baseColor="#D1D5DB" highlightColor="#444">
          <App />
        </SkeletonTheme>
      </ChatsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
