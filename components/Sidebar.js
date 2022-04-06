import React from "react";
import { FaUserCircle, FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email); // Get all chats where users email are included

  const [chatsSnapshot] = useCollection(userChatRef); // realtime listener

  const createChat = () => {
    const input = prompt(
      "Please enter a email that you would like to chat with."
    );

    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user.email
    ) {
      // We need to add the chat into the DB "chats" collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };
  const chatAlreadyExist = (recipientEmail) => {
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((users) => user === recipientEmail)?.length > 0
    );
  };

  return (
    <div className="flex-[0.45] border-r h-screen min-w-[350px] max-w-[350px] overflow-y-scroll scrollbar-hide">
      <header className=" flex sticky top-0 justify-between items-center p-5 h-24 border-b">
        <img
          src={user.photoURL}
          className="rounded-full w-10 h-10 cursor-pointer"
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className="flex space-x-4 ">
          <FaRegComment className="text-2xl text-gray-400 rounded-full hover:bg-slate-200" />
          <BsThreeDotsVertical className="text-2xl text-gray-400 rounded-full hover:bg-slate-200" />
        </div>
      </header>
      <button
        onClick={createChat}
        className="w-full text-gray-600 py-7 font-semibold hover:bg-slate-100 bg-[#fafafa] shadow-outer shadow border-b cursor-pointer"
      >
        START A NEW CHAT
      </button>
      <div className="flex items-center p-7 space-x-4 border-y">
        <BsSearch />
        <input type="text" placeholder="Search..." className=" w-full" />
      </div>

      {/* LIST OF CHATS */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
}

export default Sidebar;
