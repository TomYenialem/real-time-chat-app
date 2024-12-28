import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../Api/Axios";
import { authContext } from "../Context/ContextApi";

function getAllmessages() {
  const [loading, setIsLoading] = useState(false);
  const { coversation, message, setMessage } =
    useContext(authContext);
  useEffect(() => {
    const allMessages = async () => {

          if (!coversation?._id) {
            console.warn("Conversation ID is undefined. Skipping API call.");
            return; // Exit if no valid conversation ID
          }

      try {
        setIsLoading(true);
        const { data } = await Api.get(`/getmesaage/${coversation?._id}`, {
          withCredentials: true,
        });
        setMessage(data?.message || []);
        // console.log(data.message || []);
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
  return { message, loading, setMessage };
}

export default getAllmessages;
