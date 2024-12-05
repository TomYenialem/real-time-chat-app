import React, { useEffect, useState } from 'react'
import Api from '../Api/Axios'

import { toast } from'react-toastify';

export default function getUsers() {
 const [isloding,setIsLoading] =useState(false)
 const [users, setUsers] = useState([])

 useEffect(()=>{
    const allusers=async()=>{
        setIsLoading(true)

        try {
            const response =await Api.get('/getuser')
            
            console.log(response)
            setUsers(response.data)
        } 
        
        
        catch (error) {
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
        

    }
   
    allusers()
 },[])
 return{users}

}
