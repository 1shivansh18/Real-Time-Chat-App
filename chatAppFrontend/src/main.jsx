import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyRouters from "./config/MyRouters.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <ChatProvider>
        <MyRouters />
      </ChatProvider>
    </BrowserRouter>
  </StrictMode>
);
