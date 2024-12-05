import React, { createContext, useState } from 'react'
export const authContext=createContext()
function ContextApi({children}) {
    const[authUser,setAuthUser] =useState(localStorage.getItem('token')||null)
    const conetextValues={
         authUser,
         setAuthUser,
     
    }
  return (
    <authContext.Provider value={conetextValues}>
      {children}
    </authContext.Provider>
  )
}

export default ContextApi