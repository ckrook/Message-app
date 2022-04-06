import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaUserCircle } from "react-icons/fa";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth); // User that is signed in
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  //   console.log(recipientEmail);
  return (
    <div
      onClick={enterChat}
      className="flex items-center cursor-pointer py-7 p-2 hover:bg-slate-50 border-b border-gray-200"
    >
      {recipient ? (
        <img
          src={recipient?.photoURL}
          className="h-7 text-gray-400 w-7 m-2 mr-4 rounded-full"
          alt=""
        />
      ) : (
        <FaUserCircle
          className="shrink-0 h-7 text-gray-400 w-7 m-2 mr-4"
          alt=""
        />
      )}
      <p>{recipientEmail}</p>
    </div>
  );
}

export default Chat;
