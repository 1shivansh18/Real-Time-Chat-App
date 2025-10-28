import React, { useState } from "react";
import toast from "react-hot-toast";
import { createRoomApi, joinRoomApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreatRoom = () => {  // Create a new component called JoinCreatRoom. This component will be used to join or create a room.
  const [detail, setDetail] = useState({  // Create a state variable called detail. This variable will be used to store the room id and user name.
    roomId: "",  // Initialize the room id as an empty string.
    userName: "",  // Initialize the user name as an empty string.
  });

   const {roomId , setRoomId , currUser , setCurrUser , connected , setConnected } = useChatContext(); // Destructure the roomId, setRoomId, currUser, setCurrUser, connected, and setConnected variables from the useChatContext hook. This hook is used to access the global state variables.
 
    const navigate =useNavigate()   // Create a navigate variable. This variable will be used to navigate to different pages.

  function handleInputChange(event) {  // Create a function called handleInputChange. This function will be used to update the detail state variable when the user types in the input fields.
    setDetail({  // 
      ...detail, // Spread the current detail state variable. This will keep the current values of the detail state variable.
      [event.target.name]: event.target.value, // 
    });
  }

  function valiDateForm(){  // Create a function called valiDateForm. This function will be used to validate the form. If the form is valid, the function will return true. If the form is not valid, the function will return false.
    if(detail.roomId === "" || detail.userName === ""){  // if the room id or user name is an empty string, then the form is not valid.
      toast.error("Invalied details") // for invalid details show error message
      return false; 
    }else{  // if the room id and user name are not empty strings, then the form is valid.
      return true;
    }
  }

  async function joinRoom(){  // Create a function called joinRoom. This function will be used to join a room. This function will be called when the user clicks the join room button.
    if(valiDateForm()){     // if form is valid then only join room
      try { // try to join room 
      const room = await joinRoomApi(detail.roomId); // call joinRoomApi function with room id as argument and store the response in room variable. This function will return a promise. So we use await keyword to wait for the promise to resolve.
      toast.success("Joined..")  // if room is joined successfully then show success message
      setCurrUser(detail.userName);  // set current user name to user name entered by user
      setRoomId(room.roomId);  // set room id to room id returned by joinRoomApi function
      setConnected(true)  // set connected to true. This will be used to show chat screen
      navigate("/chat")   // navigate to chat screen
      } catch (error) {    // if there is any error in joining room then show error message
        if(error.status == 400){  // 400 status code means room not found
          toast.error(error.response.data) // show error message returned by server
        }else{   // if status code is not 400 then show generic error message
          console.log(error);  
           toast.error("error in joining room") 
        }
      }
    }
  }

  async function createRoom(){  // Create a function called createRoom. This function will be used to create a room. This function will be called when the user clicks the create room button.
    if(valiDateForm()){   // if form is valid then only create room
      console.log(detail)  // log the detail object to console. This object contains the room id and user name entered by user.

      try {
         const response = await createRoomApi(detail.roomId)  // call createRoomApi function and pass room id as argument. This function will return a promise. We will wait for this promise to resolve. If the promise is resolved then we will get the response. If the promise is rejected then we will get the error.
         console.log(response)  // log the response to console. This response contains the room id and user name entered by user.
         toast.success("Room Created Succussfully");  // show success message. This message will be shown for 3 seconds. After 3 seconds it will be automatically hidden.
         setCurrUser(detail.userName); // set the user name in the state. This user name will be used to display the user name in the chat screen.
         setRoomId(response.roomId); // set the room id in the state. This room id will be used to join the room.
         setConnected(true) //  set the connected state to true. This state will be used to display the chat screen. If the connected state is true then chat screen will be displayed. If the connected state is false then create room screen will be displayed.
         navigate("/chat")  // navigate to chat screen. This will be done by using the navigate function. This function will take the path of the screen as argument. In this case the path is /chat. This path is defined in the App.js file. This path will be used to display the chat screen.
      } catch (error) {  // if there is any error in creating the room then we will catch the error here. This error will be caught in the catch block. This error will be logged to console. This error will be shown to user by using the toast.error function. This function will take the error message as argument. In this case the error message is "Error in Creating room". This error message will be shown for 3 seconds. After 3 seconds it will be automatically hidden.
        console.log(error)
        if(error.status == 400){
          toast.error("Room already Exists")
        }else{
          toast.error("Error in Creating room")
        }
      }
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center border">
      <div className="p-8 w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <h1 className="text-2xl font-semibold text-center">
          Create and Join room..
        </h1>
        <div>
          <label htmlFor="name" className="font-medium block mb-2">
            Your name{" "}
          </label>
          <input
            type="text"
            id="name"
            onChange={handleInputChange}
            value={detail.userName}
            name="userName"
            placeholder="Enter your name here.."
            className="w-full rounded-lg dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 focus:outline-none focus:ring-2 focus: ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="name" className="font-medium block mb-2">
            Room Id/New room id
          </label>
          <input
            type="text"
            id="name"
            name="roomId"
            onChange={handleInputChange}
            value={detail.roomId}
            placeholder="Enter room Id here.. "
            className="w-full rounded-lg dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 focus:outline-none focus:ring-2 focus: ring-blue-500"
          />
        </div>

        <div className="flex justify-center items-center gap-5 mt-4">
          <button onClick={joinRoom} className="px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-900 rounded-lg ">
            Join Room
          </button>
          <button onClick={createRoom} className="px-3 py-2 dark:bg-orange-500 dark:hover:bg-orange-900 rounded-lg ">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreatRoom;
