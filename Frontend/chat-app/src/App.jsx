import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [showChat, setShowCaht] = useState(false);
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
