import React, { useContext } from "react";
import { authContext } from "../Context/ContextApi";
import { useNavigate } from "react-router-dom";
import Api from "../Api/Axios";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(authContext);

  const logout = async () => {
    try {
      const data = await Api.post("/logout");
      toast.success(data);
      localStorage.removeItem("token");
      setAuthUser(null);
    } catch (error) {
      console.log(error);
    }

    return { logout };
  };
}
