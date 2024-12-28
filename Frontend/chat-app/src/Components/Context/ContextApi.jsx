import React, { createContext, useState } from 'react'
export const authContext=createContext()
function ContextApi({children}) {
    const[authUser,setAuthUser] =useState(JSON.parse((localStorage.getItem('token')||null)))
    const[message,setMessage]=useState([])
    const[coversation,setConversation]=useState(null)
    const conetextValues={
         authUser,
         setAuthUser,
         message,
         setMessage,
         coversation,
         setConversation,
     
    }
  return (
    <authContext.Provider value={conetextValues}>
      {children}
    </authContext.Provider>
  )
}

export default ContextApi