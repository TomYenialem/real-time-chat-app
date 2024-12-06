import React, { useContext, useState } from "react";
import "./Setting.css";
import users from "../../assets/images/user.jpg";
import { IoMdSettings } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa";
import Api from "../Api/Axios";
import { authContext } from "../Context/ContextApi";
import { toast } from "react-toastify";

export default function Setting({ show, setShow }) {
  const { setAuthUser, authUser } = useContext(authContext);
  const handleShowToggle = () => {
    setShow((prev) => (prev === true ? false : true));
  };
  const logout = async () => {
    try {
      const data = await Api.post("/logout");
      // toast.success(data);
      console.log(data);
      localStorage.removeItem("token");
      setAuthUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="setting">
      <div className="logout">
        <button onClick={logout}>Logout</button>
        <span onClick={handleShowToggle}>
          {show ? <FaToggleOn /> : <FaToggleOff />}
        </span>
      </div>
      <div className="users">
        <img src={authUser?.profilepic || users} alt="" />
        <h2>{authUser.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur </p>
      </div>
      <div className="chat-setting-icons">
        <div className="setting-icons">
          <IoMdSettings />
          <p>Chat Setting</p>
        </div>
        <div className="setting-icons">
          <FaFacebookMessenger />
          <p>Saved Message</p>
        </div>
        <div className="setting-icons">
          <IoMdContact />
          <p>Contacts</p>
        </div>
        <div className="setting-icons">
          <SiGnuprivacyguard />
          <p>Privacy & security</p>
        </div>
      </div>
      <button className="block">Block user</button>
    </div>
  );
}
