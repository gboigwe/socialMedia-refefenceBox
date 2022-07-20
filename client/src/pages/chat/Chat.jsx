import React, { useEffect, useState } from 'react'

import { useSelector } from "react-redux"
import { useRef } from 'react'

import "./Chat.css"

import ChatBox from '../../components/chatbox/ChatBox'
import Conversation from '../../components/conversation/Conversation'
import LogoSearch from "../../components/logoSearch/LogoSearch"

import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import {io} from "socket.io-client"
import { userChats } from '../../api/ChatRequest'

const Chat = () => {

  // const ENDPOINT = "http://localhost:5000";

  const {user} = useSelector((state)=>state.authReducer.authData);

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket = useRef()

  // Socket get chats
  useEffect(()=> {
    const getChats = async() => {
      try {
        const {data} = await userChats(user._id)
        setChats(data)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getChats()
  }, [user._id])

   // Socket get users
   useEffect(() => {
    socket.current = io("https://localhost:8800");
    socket.current.emit("new-user-add", user._id)
    socket.current.on("get-users", (users)=> {
      setOnlineUsers(users);
      console.log(onlineUsers)
    })
  }, [user])

  // Send Message
  useEffect(() => {
    if(sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  // Receive Message
  useEffect(() => {
    socket.current.on("receive-message", (data)=> {
      setReceiveMessage(data)
    })
  }, [])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member!== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }
  
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className='Left-side-chat'>
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, i) => (
              <div onClick={() => setCurrentChat(chat)} >
                <Conversation i={i} data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className='Right-side-chat'>
        <div style={{ width: "20rem", alignSelf: "flex-end" }} >
          <div className='navIcons'>
            <Link to = "../home" >
              <img src={Home} alt="home" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="notice" />
            <Link to ="../chat">
              <img src={Comment} alt="chat" />
            </Link>
          </div>

          {/* Chat Body */}
          <ChatBox chat={currentChat} currentUser = {user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
        </div>
      </div>
    </div>
  )
}

export default Chat