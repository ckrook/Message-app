import { useRouter } from "next/router";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaTelegramPlane, FaUserCircle } from "react-icons/fa";
import { auth, db } from "../firebase";
import { GrAttachment } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useState, useRef } from "react";
import firebase from "firebase/compat/app";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import Image from "next/image";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessageRef = useRef(null);
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
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

  const ScrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    ScrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <div className="">
      <header className="sticky bg-white z-50 top-0 flex h-24 items-center border-b">
        {recipient ? (
          <img
            src={recipient?.photoURL}
            alt={recipient}
            className="h-12 text-gray-400 w-12 m-2 mr-4 rounded-full"
          />
        ) : (
          <FaUserCircle className="h-12 text-gray-400 w-12 m-2 mr-4" alt="" />
        )}
        <div className="ml-2 flex-1">
          <h3 className="mb-1 font-bold">{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p className="text-sm text-gray-500">
              Last active:{" "}
              {recipient?.lastSeen.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p className="text-sm text-gray-500">loading..</p>
          )}
        </div>
        <div className="flex space-x-4 mr-5">
          <GrAttachment className="text-xl" />

          <BiDotsVerticalRounded className="text-xl" />
        </div>
      </header>
      <main className="p-3 bg-stone-100 min-h-screen">
        {/* {Show messages} */}
        {showMessages()}
        <div ref={endOfMessageRef} className="p-[30px]" />
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
