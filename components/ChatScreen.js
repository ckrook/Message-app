import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaTelegramPlane, FaUserCircle } from "react-icons/fa";
import { auth, db } from "../firebase";
import { GrAttachment } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/Bi";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useState } from "react";
import firebase from "firebase/compat/app";
import getRecipientEmail from "../utils/getRecipientEmail";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };

  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <div className="">
      <header className="sticky bg-white z-50 top-0 flex h-24 items-center border-b">
        <FaUserCircle className="h-12 text-gray-400 w-12 m-2 mr-4" alt="" />
        <div className="ml-2 flex-1">
          <h3 className="mb-1 font-bold">{recipientEmail}</h3>
          <p className="text-sm text-gray-500">Last seen..</p>
        </div>
        <div>
          <GrAttachment />
        </div>
        <div>
          <BiDotsVerticalRounded />
        </div>
      </header>
      <main className="p-3 bg-stone-100 min-h-screen">
        {/* {Show messages} */}
        {showMessages()}
        <div></div>
        {/* End of message */}
      </main>
      <form className="flex items-center p-2 sticky bottom-0 bg-white z-50">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 items-center p-2 sticky bottom-0 bg-gray-50 rounded-l-lg"
          type="text"
        />
        <button
          disabled={!input}
          type="submit"
          onClick={sendMessage}
          className="text-2xl items-center p-2 sticky bottom-0 rounded-r-lg bg-gray-50"
        >
          <FaTelegramPlane />
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
