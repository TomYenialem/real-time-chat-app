// src/Auth.js
import React, { useContext, useState } from "react";
import "./Login.css";
import useLogin from "../Hooks/useLogin";
import { Link } from "react-router-dom";
import Api from "../Api/Axios";
import toast from "react-hot-toast";
import { authContext } from "../Context/ContextApi";
import { BeatLoader } from "react-spinners";
import welcomemessages from "../../assets/sound/welcome.mp3"

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthUser}=useContext(authContext)

  const handleLoginSubmit = async(e) => {
    e.preventDefault()
    if(!email || ! password) {
      toast.error("Please fill in all fields");
      return;

    }
    setIsLoading(true);
    try {
      const { data } = await Api.post(
        "/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      toast.success("Logged in successfully!");
      console.log(data)
      localStorage.setItem("token", JSON.stringify(data.user));
      const welcome=new Audio(welcomemessages)
      welcome.play()

      setAuthUser(data.user); 
      
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
          <h2>{"Login"}</h2>
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              // required
            />

            <button type="submit">
              {isLoading ? <BeatLoader color="white"  size={10}/> : "Login"}
            </button>
          </form>
          <p>
            <>
              New User?
              <Link to={"/signin"}>
                <button>Register</button>
              </Link>
            </>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
