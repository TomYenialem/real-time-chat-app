import React, { useState } from "react";
import "./Setting.css";
import users from "../../assets/images/user.jpg";
import { IoMdSettings } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa";

export default function Setting({ show, setShow }) {
  const handleShowToggle = () => {
    setShow((prev) => (prev === true ? false : true));
  };

  return (
    <div className="setting">
      <div className="logout">
        <button>Logout</button>
        <span onClick={handleShowToggle}>
          {show ? <FaToggleOn /> : <FaToggleOff />}
        </span>
      </div>
      <div className="users">
        <img src={users} alt="" />
        <h2>Temesegen</h2>
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
