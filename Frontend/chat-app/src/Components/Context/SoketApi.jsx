import React, { createContext, useContext, useEffect, useState } from 'react'
import  { authContext } from './ContextApi'
import { io } from 'socket.io-client'



export const soketContext=createContext()
function SoketApi({children}) {
    const[soketIo,setSoket]=useState(null)
    const[onlineUser,setOnlineUser]=useState([])
    const {authUser}=useContext(authContext)

    useEffect(()=>{
 // Connect to the server when component mounts
      if(authUser){
        const soket = io("http://localhost:3000",{
          query:{
            userId:authUser.id,

          }
        });
        
        setSoket(soket);
        // soket.on used to to listene events in both client and server

        soket.on('onlineuser', (users) => {
        setOnlineUser(users)
        });
        // Cleanup when component unmounts
        return () => {
          soket.close();
          setSoket(null);
        };
      }
      else{
          if(soketIo){
              soketIo.close()
              setSoket(null)
          }
  
      }
    },[authUser])
   

     const contextValues = {
        soketIo,
       onlineUser,
       
     };
    return (
      <soketContext.Provider value={contextValues}>
        {children}
      </soketContext.Provider>
    )

}

export default SoketApi