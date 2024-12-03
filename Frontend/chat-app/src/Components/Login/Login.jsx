// src/Auth.js
import React, { useState } from "react";
import "./Login.css";
import user from "../../assets/images/user.jpg";


const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avater, setAvater] = useState({
    file: null,
    url: "",
  });
  const makeProfilePic = (e) => {
    if (e.target.files[0]) {
      setAvater({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const zoomImage = (e) => {
    e.target.classList.remove("zoom-image");
  };
  const removeZoom = (e) => {
    e.target.classList.add("zoom-image");
  };

  const handleSubmit = (e) => {
    const forms = new FormData(e.target);
    const values = ({ name, password, email } = Object.fromEntries(forms));
    console.log(values);
  };

  return (
    <div className="all">
      <div className="auth-container">
        <div className="login-container">
          <h2>{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                <input
                  type="email"
                  id="email"
                  value={name}
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  name="name"
                />
                <img
                  src={avater.url || user}
                  alt=""
                  className="user-pro-img"
                  onClick={zoomImage}
                  onDoubleClick={removeZoom}
                />
                <label htmlFor="file">Upload Profile Pic</label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  onChange={makeProfilePic}
                />
              </>
            ) : (
              ""
            )}
            {/* <label htmlFor="email">Email:</label> */}
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <label htmlFor="password">Password:</label> */}
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>
          <p>
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsRegister(false)}>Login</button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button onClick={() => setIsRegister(true)}>Register</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
