import React from "react";

function Message({ user, message }) {
  return (
    <div>
      <p>{message.message}</p>
    </div>
  );
}

export default Message;
