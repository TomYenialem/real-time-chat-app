import React, { useContext, useState } from "react";
import "./User.css";
import usersImg from "../../assets/images/user.jpg";
import { IoVideocam } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import getUsers from "../Hooks/getUsers";
import { authContext } from "../Context/ContextApi";
import UserForm from "./userForm";

export default function User() {
  const [add, setAdd] = useState(false);
  const { users } = getUsers();
  const { authUser } = useContext(authContext);

  const [search, setSearch] = useState("");

  const searchUser = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handelSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="user">
      <div className="user-info">
        <div className="user-img">
          <img src={authUser?.profilepic || usersImg} alt="" />
          <span>{authUser?.name}</span>
        </div>
      </div>

      <div className="user-search">
        <div className="search-bar">
          <FaSearch className="sr" />
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={handelSearch}
          />
        </div>
        <div className="add">
          <h1 onClick={() => setAdd((prev) => !prev)}>{!add ? "+" : "-"}</h1>
        </div>
      </div>

      <div className="item-group">
        {searchUser.map((user,index) => {
          return <UserForm user={user}  key={index}/>;
        })}
      </div>
    </div>
  );
}
