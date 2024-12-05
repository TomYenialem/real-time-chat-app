import React, { useState } from 'react'
import User from '../UserInfo/User'
import Chat from '../Chat/Chat'
import Setting from '../Setting/Setting'

function Home({show,setShow}) {
    
  return (
    <>
      <User />
      <Chat />
      <Setting show={show} setShow={setShow} />
    </>
  );
}

export default Home