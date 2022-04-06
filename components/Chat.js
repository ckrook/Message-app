import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div className="flex items-center cursor-pointer p-2 hover:bg-slate-50">
      <FaUserCircle className="h-7 text-gray-400 w-7 m-2 mr-4" src="" alt="" />
      <p>{recipientEmail}</p>
    </div>
  );
}

export default Chat;
