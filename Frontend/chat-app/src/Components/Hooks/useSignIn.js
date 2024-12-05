import React, { useState } from "react";
import Api from "../Api/Axios";
import toast from "react-hot-toast";

function useSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserNames] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const signIn = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }

    if (!username || !password || !email || confirmPass) {
      toast.error("Please enter all required fields");
      return;
    }
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const datas = await Api.post("/signin", {
        username,
        password,
        email,
        confirmPass,
      });
      console.log(datas);
      toast.success("Signed In Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    email,
    password,
    confirmPass,
    username,
    setPassword,
    setConfirmPass,
    setEmail,
    setUserNames, // return the setter `setUserNames`
    signIn,
  };
}

export default useSignIn;
