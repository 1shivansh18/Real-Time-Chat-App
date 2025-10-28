import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../component/ChatPage'

function MyRouters() { // MyRouters is a functional component that defines the routes for the application
  return (
    <div>
      <Routes>  
        <Route path='/' element = {<App/>} />
        <Route path='chat' element = {<ChatPage/>} />   
      </Routes>
    </div>
  )
}

export default MyRouters
