import React from "react";
import { FaUserCircle, FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";

function Sidebar() {
  const createChat = () => {
    const input = prompt(
      "Please enter a email that you would like to chat with."
    );
  };
  return (
    <div>
      <header className="flex sticky top-0 justify-between items-center p-5 h-18 border-b-slate-700">
        <FaUserCircle className="text-2xl text-gray-400" />
        <div className="flex space-x-4 ">
          <FaRegComment className="text-2xl text-gray-400 rounded-full hover:bg-slate-200" />
          <BsThreeDotsVertical className="text-2xl text-gray-400 rounded-full hover:bg-slate-200" />
        </div>
      </header>
      <div className="flex items-center p-5 rounded-lg">
        <BsSearch />
        <input type="text" placeholder="Search..." className="border w-full" />
      </div>
      <button
        onClick={createChat}
        className="w-full text-gray-600 py-4 hover:bg-slate-50 cursor-pointer"
      >
        START A NEW CHAT
      </button>

      {/* LIST OF CHATS */}
    </div>
  );
}

export default Sidebar;
