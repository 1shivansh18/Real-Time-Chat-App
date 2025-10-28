import { createContext, useContext } from "react";
import { useState } from "react";

const chatContext = createContext();  // Create a context for the chat

export const ChatProvider = ({children}) =>{  // Create a provider component for the chat context
    const [roomId, setRoomId] = useState("");  // Create state variables for the room ID and current user
    const [currUser, setCurrUser] = useState(""); 
    const [connected, setConnected] = useState(false) 

    return (
        <chatContext.Provider   // Provide the state variables to the context
            value={{roomId , setRoomId , currUser , setCurrUser , connected , setConnected}} // provide the state variables to the context
        >
            {children}  
        </chatContext.Provider>
    )
}

const useChatContext = () => useContext(chatContext) // Create a custom hook to use the chat context

export default useChatContext;  // Export the custom hook

