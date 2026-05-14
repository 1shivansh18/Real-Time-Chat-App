import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHealper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/ShowTimeAgo";

const ChatPage = () => {
  const { roomId, currUser, connected , setConnected ,setRoomId , setCurrUser} = useChatContext();  // getting roomId, currUser, connected from context
//   console.log(roomId);
//   console.log(currUser);
//   console.log(connected);

  const navigate = useNavigate();  // for navigate into diffrent page

  useEffect(() => {    // for if user is not connected then navigate to home page
    if (!connected) {  // if user is not connected then navigate to home page
      navigate("/joinchat");   // navigate to home page
    }
  }, [roomId, currUser, connected]);  // if roomId, currUser, connected is changed then useEffect will run

  const [message, setMessage] = useState([  // for storing messages

  ]);
  const [input, setInput] = useState("");   // for storing input value
  const inputRef = useRef(null);   // for focusing input field
  const chatBoxRef = useRef(null);  // for scrolling chat box
  const [stompClient, setStompClient] = useState(null);  // for storing stomp client


  // For old messages form database 

  useEffect(()=>{          
    async function loadmessages() {    // for loading old messages from database
      try {  // try catch block for handling errors
        const messages = await getMessagess(roomId);   // getting messages from database
          setMessage(messages)  // setting messages in state
      } catch (error) {     // if error occurs then show error message
        console.log(error);  // printing error message in console
      }
    }
    if(connected){   // if user is connected then load messages
      loadmessages()  // calling loadmessages function
    } 
  } , [])    // useEffect will run only once when component is mounted

  useEffect(()=> {
    if(chatBoxRef.current){  // if chatBoxRef is not null then scroll to bottom
      chatBoxRef.current.scroll({  // scrolling chat box to bottom
        top: chatBoxRef.current.scrollHeight ,    // scrolling to bottom  
        behavior : "smooth" ,    // smooth scrolling
      })
    }
  } , [message]) // useEffect will run when message state is updated
   

  useEffect(() => {
  const connectWebSocket = () => {
    const sock = new SockJS(`${baseURL}/chat`);

    const client = Stomp.over(sock);

    client.connect(
      {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // ✅ JWT added
      },
      () => {
        setStompClient(client);
        setConnected(true); // ✅ mark as connected

        toast.success("Connected..");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessage((prev) => [...prev, newMessage]);
        });
      },
      (error) => {
        console.error("WebSocket error:", error);
      }
    );
  };

  // ✅ connect when roomId changes
  connectWebSocket();

  // ✅ cleanup when room changes / component unmounts
  return () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect();
    }
  };
}, [roomId]);


  const sendMessage = async () =>{   // function for sending message to websocket
    if(stompClient && connected && input.trim()){   // if stomp client is connected and input is not empty then send message
        
        const message ={    // creating message object to send to websocket
            sender : currUser ,  // currUser is the user who is sending message
            content : input ,   // input is the message that user is typing
            roomId : roomId     // roomId is the room in which message is being sent
        }

        stompClient.send(`/app/sendMessage/${roomId}` , {} , JSON.stringify(message));  // sending message to websocket and passing room id and message object as second and third argument
        setInput("")  // clearing input field after sending message
    }
  }

  const handleLogout = () =>{  // function for logging out from room and disconnecting from websocket
    stompClient.disconnect()   // disconnecting from websocket
    setConnected(false)        // updating connected state to false
    setRoomId("")  // clearing roomId state
    setCurrUser("") // clearing currUser state
    navigate("/joinchat")  // navigating to home page
  }

  return (
    <div className="">
      <header className="flex justify-around dark:border-gray-900 dark:bg-gray-900 shadow fixed h-16 w-full py-3 items-center">
        <div>
          <h1 className="text-xl font-semibold ">
            Room : <span>{roomId}</span>
          </h1>
        </div>

        <div className="text-xl font-semibold ">
          <h1>User : {currUser}</h1>
        </div>
        <div>
          <button onClick={handleLogout} className="px-3 py-2 rounded dark:bg-red-500 hover:dark:bg-red-700">
            Leave Room
          </button>
        </div>
      </header>

      <main ref={chatBoxRef} className="py-20 overflow-auto w-2/3 mx-auto h-screen px-5 dark:bg-slate-600">
        {message.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currUser ? "bg-green-900" : "bg-purple-600"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 "
                  src="https://avatar.iran.liara.run/public/38"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs">{timeAgo(message.timeStamp)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="h-16 fixed w-full bottom-2">
        <div className="h-full  flex justify-between gap-4 px-2 items-center w-2/3 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => {setInput(e.target.value)}}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here.."
            className="dark:bordergray-700 focus:outline-none dark:bg-gray-900 px-3 w-full py-2 h-full"
          />

          <div className="flex items-center gap-4">
            <button className=" h-11 w-11 flex justify-center items-center  rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button className="dark:bg-green-500 h-11 w-11 flex justify-center items-center  rounded-full hover:dark:bg-green-700">
              <MdSend onClick={sendMessage} size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
