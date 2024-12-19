import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import user from "../../assets/images/user.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { TiMessages } from "react-icons/ti";
import { authContext } from "../Context/ContextApi";
import getAllmessages from "../Hooks/getAllmessages";
import toast from "react-hot-toast";
import Api from "../Api/Axios";
import {ClipLoader} from 'react-spinners'
import { formatChatTime } from "../Time";


export default function Chat() {

  const [emoji, setEmoji] = useState(false);
  const { allmessages, loading,setAllmessages } = getAllmessages();
  const [isloading, setIsloading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const { coversation, authUser } =
    useContext(authContext);

  const sendMessagetoUser = async () => {
    if (messageInput === ""){
      toast.error("Please enter a message");
      return;
    }
    try {
      setIsloading(true);
      const response = await Api.post(
        `/sentmesaage/${coversation._id}`,
        { message: messageInput },

        {
          withCredentials: true,
        }
      ); 
       
       setAllmessages([...allmessages, response.data]);
       setMessageInput('')
      toast.success("Sent mesaage");
    
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response) {
        toast.error(error.response.data.msg || "An error occurred");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsloading(false);
    }
  };
  const endRef = useRef(null);
 useEffect(() => {
   endRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [allmessages]);

  const hadleEmojies = (e) => {
    console.log(e.emoji);
    setMessageInput([messageInput, e.emoji].join(""));
  };
  const removeEmoji = () => {
    setEmoji(false);
  };

  return (
    <div className="chat">
      {!coversation ? (
        <div className="no_chat">
          <p>Welcome {authUser.username}👋</p>
          <p>Select a chat to start messaging</p>
          <TiMessages className="no_msg" />
        </div>
      ) : (
        <>
          <div className="top">
            <div className="user-name">
              <img src={user} alt="" />
              <div className="text">
                <h2>To:{coversation.username}</h2>
                <p>Lorem ipsum, dolor sit</p>
              </div>
            </div>
            <div className="address">
              <FaPhoneAlt />
              <FaVideo />
            </div>
          </div>
          <div className="middle" onClick={removeEmoji}>
            {allmessages?.length > 0 ? (
              allmessages.map((message, index) => (
                <div
                  key={index}
                  className={`send-message ${
                    message.senderId === authUser._id ? "own" : ""
                  }`}
                >
                  {message.senderId !== authUser._id && (
                    <img src={user} alt="user" />
                  )}
                  <div className="text">
                    <p>{message.message}</p>
                    <span>{formatChatTime(message.timestamp)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>Send a message to start the conversation</p>
            )}
            <div ref={endRef}></div>
          </div>

          <div className="bottom">
            <div className="cameras">
              <IoCamera />
              <IoMdPhotos />
              <MdKeyboardVoice />
            </div>
            <div className="middle-input">
              <input
                type="text"
                placeholder="write message"
                name=" message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onClick={removeEmoji}
              />
            </div>
            <div className="send">
              <span>
                <div className="main-emoji">
                  <MdEmojiEmotions onClick={() => setEmoji((prev) => !prev)} />
                </div>
                <div className="emoji-picker">
                  {emoji && <EmojiPicker onEmojiClick={hadleEmojies} />}
                </div>
              </span>
              <span>
                {isloading ? (
                  <ClipLoader />
                ) : (
                  <IoMdSend
                    onClick={() => {
                      if (!isloading) sendMessagetoUser();
                    }}
                  />
                )}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
