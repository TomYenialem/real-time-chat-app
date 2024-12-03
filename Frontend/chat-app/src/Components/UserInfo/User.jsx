import React, { useState } from "react";
import "./User.css";
import user from "../../assets/images/user.jpg";
import { IoVideocam } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

export default function User() {
  const [add, setAdd] = useState(false);
  return (
    <div className="user">
      <div className="user-info">
        <div className="user-img">
          <img src={user} alt="" />
          <span>Temesgen</span>
        </div>
        <div className="user-icons">
          <BsThreeDots />
          <IoVideocam />
          <CiEdit />
        </div>
      </div>

      <div className="user-search">
        <div className="search-bar">
          <FaSearch className="sr" />
          <input type="text" placeholder="search" />
        </div>
        <div className="add">
          <h1 onClick={() => setAdd((prev) => !prev)}>{!add ? "+" : "-"}</h1>
        </div>
      </div>
      <div className="item-group">
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
      </div>
      <div className="item-group">
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
        <div className="items">
          <img src={user} alt="" />
          <div className="text">
            <span>Temegen</span>
            <p className="latest-msg">selma nw</p>
          </div>
        </div>
      </div>
    </div>
  );
}
