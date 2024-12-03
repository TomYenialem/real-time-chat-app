import { useState } from 'react'

import './App.css'
import User from './Components/UserInfo/User';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';

function App() {
const [showChat, setShowCaht] = useState(true);
const [show, setShow] = useState(false);

  return (
    <>
      <div className={` ${show ? "bg" : "container"}`}>
        {showChat ? (
          <>
            <Login />
          </>
        ) : (
          <div className="body-lists">
            <User />
            <Chat />
            {/* <Setting show={show} setShow={setShow} /> */}
          </div>
        )}
      </div>
    </>
  );
}

export default App
