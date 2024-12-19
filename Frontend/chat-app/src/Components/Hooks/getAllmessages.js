import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../Api/Axios";
import { authContext } from "../Context/ContextApi";

function getAllmessages() {
  const [loading, setIsLoading] = useState(false);
  const [allmessages, setAllmessages] = useState([]);
  const { coversation, setConversation } = useContext(authContext);
  useEffect(() => {
    const allMessages = async () => {
      try {
        setIsLoading(true);
        const { data } = await Api.get(`/getmesaage/${coversation?._id}`, {
          withCredentials: true,
        });
        setAllmessages(data?.message || []);
        console.log(data.message || []);
      } catch (error) {
        console.error("Error during sign-in:", error);
        if (error.response) {
          toast.error(error.response.data.msg || "An error occurred");
        } else {
          toast.error("Network error. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    allMessages();
  }, [coversation?._id]);
  return { allmessages, loading, setAllmessages };
}

export default getAllmessages;
