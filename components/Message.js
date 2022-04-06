import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <div>
      <TypeOfMessage>
        {message.message}
        {/* <span className="text-[9px] text-gray-400">
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </span> */}
      </TypeOfMessage>
    </div>
  );
}

export default Message;

const MessageElement = styled.p`
  display: flex;
  position: relative;
  flex-direction: column;
  width: fit-content;
  margin-bottom: 15px;
  padding: 10px 20px;
  line-height: 24px;
  word-wrap: break-word; /* Make sure the text wraps to multiple lines if long */
  border-radius: 25px;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  color: white;
  background-color: #0b93f6;
  &:before {
    width: 20px;
    right: -7px;
    background-color: #0b93f6;
    border-bottom-left-radius: 16px 14px;
  }

  &:after {
    width: 26px;
    background-color: #f5f5f4; /* All tails have the same bg cutout */
    right: -26px;
    border-bottom-left-radius: 10px;
  }
  &:before,
  &:after {
    position: absolute;
    bottom: 0;
    height: 25px; /* height of our bubble "tail" - should match the border-radius above */
    content: "";
  }
`;

const Receiver = styled(MessageElement)`
  background-color: #e5e5ea;
  text-align: left;
  margin-right: auto;
  color: black;
  background-color: #e5e5ea;
  &:before {
    width: 20px;
    left: -7px;
    background-color: #e5e5ea;
    border-bottom-right-radius: 16px 14px;
  }

  &:after {
    width: 26px;
    background-color: #f5f5f4; /* All tails have the same bg cutout */
    left: -26px;
    border-bottom-right-radius: 10px;
  }
  &:before,
  &:after {
    position: absolute;
    bottom: 0;
    height: 25px; /* height of our bubble "tail" - should match the border-radius above */
    content: "";
  }
`;
