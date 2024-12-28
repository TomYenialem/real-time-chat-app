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
      const response = await Api.post("/logout");
      toast.success(response.data.msg); 
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      localStorage.removeItem("token");
      setAuthUser(null);
      navigate("/login"); 
    }
  };

  return { logout };
}
