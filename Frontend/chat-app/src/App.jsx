import { useContext, useState } from "react";

import "./App.css";
import Login from "./Components/Login/Login";

import { Toaster } from "react-hot-toast";
import { Routes, Route,Navigate } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import { authContext } from "./Components/Context/ContextApi";
import Home from "./Components/Home/Home";

function App() {
  const{authUser}=useContext(authContext)
  const [show, setShow] = useState(false);
  return (
    <div className={` ${show ? "bg" : "container"}`}>
      <Routes>
        <Route path="/" element={authUser ?<Navigate to={'/home'}/>:<Login/>} />
        <Route
          path="/signin"
          element={authUser ? <Navigate to={'/home'}/>:<SignIn/>}
        />
        <Route
          path="/home"
          element={
            <div className="body-lists">
              {authUser?
            <Home show={show} setShow={setShow}/>:<Navigate to={'/'}/>
              }
            </div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
