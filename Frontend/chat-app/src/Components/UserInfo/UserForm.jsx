import React, { useContext } from "react";
import usersImg from "../../assets/images/user.jpg";
import { authContext } from "../Context/ContextApi";

function UserForm({ user }) {
 
  const { coversation, setConversation } = useContext(authContext);
  const isSelected = coversation?._id === user._id;
  console.log(isSelected);
  return (
    <div>
      <div className={`items ${isSelected ?'bg-item':''}` } key={user.id} onClick={()=>setConversation(user)}>
        <img src={user?.profilepic || usersImg} alt="" />
        <div className="text">
          <span>{user.username}</span>
          {/* <p className="latest-msg">selma nw</p> */}
        </div>
      </div>
    </div>
  );
}

export default UserForm;
