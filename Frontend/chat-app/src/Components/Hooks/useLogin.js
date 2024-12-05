import React, { useState } from "react";
import toast from "react-hot-toast";
import Api from "../Api/Axios";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await Api.post("/login", {
        email: email,
        password: password,
      });

      console.log(response);
      toast.success("Logged in successfully!");
    } catch (error) {
      // toast.error(error.message)
      console.log(error);
    }
  };
  return { login, email, password, setEmail, setPassword };
}
