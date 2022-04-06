import React from "react";
import Head from "next/head";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    console.log("hello");
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div className="grid place-items-center h-screen bg-gray-50">
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex p-32 rounded-2xl bg-white flex-col justify-center items-center">
        <img
          className="mb-8"
          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          alt=""
        />
        <button onClick={signIn} className="border rounded-lg p-5">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
