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

export default function Chat() {
  const [emoji, setEmoji] = useState(false);
  const [messageInput, setMessageInput] = useState("");

    const { coversation, authUser } = useContext(authContext);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleInput = (e) => {
    setMessageInput(e.target.value);
    console.log(e.target.value);
  };
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
                <h2>{coversation.username}</h2>
                <p>Lorem ipsum, dolor sit</p>
              </div>
            </div>
            <div className="address">
              <FaPhoneAlt />
              <FaVideo />
            </div>
          </div>
          <div
            className="middle"
            onClick={removeEmoji}
            style={{ height: "100px" }}
          >
            <div className="send-message own">
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt repellat veritatis commodi, ex impedit, quas hic
                  quasi quae cum in architecto voluptate laboriosam debitis sunt
                  tenetur ut a culpa. Repellat.
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="send-message">
              <img src={user} alt="" sty />
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt repellat veritatis commodi, ex impedit, quas hic
                  quasi quae cum in architecto voluptate laboriosam debitis sunt
                  tenetur ut a culpa. Repellat.
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="send-message own">
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt repellat veritatis commodi, ex impedit, quas hic
                  quasi quae cum in architecto voluptate laboriosam debitis sunt
                  tenetur ut a culpa. Repellat.
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="send-message">
              <img src={user} alt="" sty />
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt repellat veritatis commodi, ex impedit, quas hic
                  quasi quae cum in architecto voluptate laboriosam debitis sunt
                  tenetur ut a culpa. Repellat.
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="send-message own">
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt repellat veritatis commodi, ex impedit, quas hic
                  quasi quae cum in architecto voluptate laboriosam debitis sunt
                  tenetur ut a culpa. Repellat.
                </p>
                <span>1 min ago</span>
              </div>
            </div>
            <div className="send-message">
              <img src={user} alt="" sty />
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt repellat veritatis commodi, ex impedit, quas hic
                  quasi quae cum in architecto voluptate laboriosam debitis sunt
                  tenetur ut a culpa. Repellat.
                </p>
                <span>1 min ago</span>
              </div>
            </div>
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
                value={messageInput}
                onChange={handleInput}
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
                <IoMdSend />
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
