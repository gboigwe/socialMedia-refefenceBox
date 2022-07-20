import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest'
import "./ChatBox.css"
// import { format } from "timeago.js"
import InputEmoji from "react-input-emoji"
import { getUser } from '../../api/UserRequest'

const ChatBox = ({ chat, currentUser, setSendMessage,receiveMessage }) => {
  
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  
  // fetching data
  useEffect(() => {
    const userId = chat?.members?.find((id) => id!== currentUser);
    const getUserData = async() => {
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    }
    if(chat!==null) getUserData();
  }, [chat, currentUser])

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const {data} = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    }
    if(chat !== null) fetchMessages();
  }, [chat])

  // scroll to last message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // send message
  const handleSend = async(e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    const receiverId = chat.members.find((id) => id !==currentUser);
    // Send Message to socket server
    setSendMessage({...message, receiverId})

    // send message to database
    try {
      const {data} = await addMessage(message);
      setMessages([...messages, data])
      setNewMessage("")
    } catch {
      console.log("error");
    }
  }

  // receive message
  useEffect(()=> {
    console.log("Message Shown", receiveMessage);
    if(receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  
  const scroll = useRef()
  const imageRef = useRef()
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <div className="online-dot"></div>
                  <img src={userData?.profilePicture?process.env.REACT_APP_PUBLIC_FOLDER+userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="" className='followerImage' style={{ width: "50px", height: "50px" }} />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData?.firstname} {userData?.lastname}</span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "95%,", border: "0.1px solid #ececec", marginTop: "20px" }} />
            </div>

            {/* Chat Box Messages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}
                  >
                    <span>{message.text}</span>
                    {/* <span>{format(message.createdAt)}</span> */}
                  </div>
                </>
              ))}
            </div>

                {/* Chat Sender */}
                <div className="chat-sender">
                  <div onClick={() => imageRef.current.click()} >+</div>
                  <InputEmoji value={newMessage} onChange={handleChange} />
                  <div className="send-button button" onClick={handleSend} >
                    Send
                  </div>
                  <input type="file" name="" id="" style={{ display: "none" }} ref={imageRef} />
                </div>{" "}
          </>
        ) : (
          <span className='chatbox-empty-message' >CLICK A CHAT TO START A CONVERSATION...</span>
        ) }
      </div>
    </>
  );
};

export default ChatBox