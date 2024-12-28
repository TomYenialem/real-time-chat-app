import React, { useContext, useEffect } from "react";
import { soketContext } from "../Context/SoketApi";
import { authContext } from "../Context/ContextApi";
import notification from '../../assets/sound/notification.mp3'

function soketMessages() {
  const { soketIo } = useContext(soketContext);
  const { message, setMessage } = useContext(authContext);

  useEffect(() => {
    soketIo?.on("newMessage", (msg) => {
      msg.shakeMessage = true;
      const audio = new Audio(notification);
      audio.play();
      setMessage([...message, msg]);
    });
    return () => soketIo?.off();
  }, [soketIo, message, setMessage]);
}

export default soketMessages;
