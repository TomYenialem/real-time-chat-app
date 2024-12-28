import React, { useContext, useState } from "react";
import { authContext } from "../Context/ContextApi";

function sendPhoto() {
  const { message, setMessage } = useContext(authContext);
  const [selectedImage, setSelectdImage] = useState(null);

  const sendPhotoMessages = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectdImage(file);
    }
  };
  return { sendPhotoMessages, selectedImage };
}
export default sendPhoto;
