import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../Api/Axios.js";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import './SignIn.css'
import {BeatLoader} from 'react-spinners'
import { authContext } from "../Context/ContextApi.jsx";


export default function SignIn() {
  const{ setAuthUser}=useContext(authContext)
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserNames] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const[showPassword,setShowPassword] = useState(true);


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }
    if (!username || !password || !email || !confirmPass) {
      toast.error("Please enter all required fields");
      return;
    }
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    // Attempt to sign in
    try {
      setIsLoading(true);
      const {data}  = await Api.post("/signin", {
        username:username,
        password:password,
        email:email,
        confirmPass:confirmPass,
      });
      console.log(JSON.stringify(data.user));
      toast.success("Signed In Successfully");

      localStorage.setItem("token", JSON.stringify(data.user));
      setAuthUser(data.user);
      // console.log(localStorage.setItem("token", JSON.stringify(data.user)));

    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response) {
        toast.error(error.response.data.msg || "An error occurred");
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="all">
      <div className="auth-container">
        <div className="login-container">
          <h2>{"Register"}</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter Your Name"
              onChange={(e) => setUserNames(e.target.value)}
              // required
              name="username"
            />
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <div className="pass-container">
              <input
                type={`${showPassword?'password':'text'}`}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                tabIndex={-1}
                // required
              />
            <div
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </div>
            </div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPass}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
              // required
            />
            <button type="submit">{isLoading?<BeatLoader  color="white" size={10}/>:'Register'}</button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to={"/"}>
              <button>Login</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
