import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
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
import ChatForm from "./ChatForm";
import soketMessages from "../Hooks/soketMessages";
import sendPhoto from "../Hooks/sendPhoto";

export default function Chat() {
  soketMessages()

  const [emoji, setEmoji] = useState(false);
  const{sendPhotoMessages}=sendPhoto()
  const { message, loading, setMessage } = getAllmessages();
  const [isloading, setIsloading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const {
    coversation,
    authUser,
    setConversation,
  } = useContext(authContext);



  // send message and images
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessageInput({ ...messageInput, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

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
       console.log(response.data)
       setMessage([...message, response.data]);
       setMessageInput("");

      // toast.success("Sent mesaage");
    
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



  // enable function with enter keyword
  const handleKeyPress=(e)=>{
    if(e.key==='Enter'){
      sendMessagetoUser();
    }
  }


  // unmount the coversation after logout to reset the selected user
  useEffect(()=>{
    return ()=>{
     setConversation(null);
    }
  },[setConversation])

  const endRef = useRef(null);
 useEffect(() => {
   endRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [message]);

  const hadleEmojies = (e) => {
    console.log(e.emoji);
    setMessageInput([messageInput, e.emoji].join(""));
  };
  const removeEmoji = () => {
    setEmoji(false);
  };

    const handleGalleryClick = () => {
      document.getElementById("photo").click(); 
     
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
              <img src={coversation.profilepic} alt="" />
              <div className="text">
                <h2>{coversation.username}</h2>
                <p>Last seen :</p>
              </div>
            </div>
            <div className="address">
              <FaPhoneAlt />
              <FaVideo />
            </div>
          </div>
          {loading ? (
            <p className="updating">Updating....</p>
          ) : (
            <div className="middle" onClick={removeEmoji}>
              <ChatForm message={message}/>
              <div ref={endRef}></div>
            </div>
          )}
          <div className="bottom">
            <div className="cameras">
              <IoCamera  onClick={handleGalleryClick}/>
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
                onKeyDown={handleKeyPress}
              />
             <input type="file"
             style={{display:'none'}}
             onChange={handleFileChange}
             id="photo"
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
                  <ClipLoader size={14} color="yellow"/>
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
