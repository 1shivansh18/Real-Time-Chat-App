import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../component/ChatPage'
import Signup from '../component/Signup.jsx'
import Login from '../component/Login.jsx'
import ProtectedRoutes from '../component/ProtectedRoutes.jsx'
function MyRouters() { // MyRouters is a functional component that defines the routes for the application
  return (
    <div>
      <Routes>
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/' element = {<Login/>} />

        <Route element= {
          <ProtectedRoutes />
        }>
          <Route path='/joinchat' element = {<App/>} />
          <Route path='chat' element = {<ChatPage/>} />   
        </Route>

        {/* <Route path='/joinchat' element = {<App/>} />
        <Route path='chat' element = {<ChatPage/>} />    */}
      </Routes>
    </div>
  )
}

export default MyRouters
