import React from "react";
import Head from "next/head";
import { auth, provider } from "../firebase";
import { RiChatSmile2Line } from "react-icons/ri";

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

      <div className="shadow-md flex p-12 bg-gradient-to-b from-stone-50 to-white border border-gray-200 rounded-2xl bg-white flex-col justify-center items-center">
        <RiChatSmile2Line className="text-6xl mb-4 text-blue-500" />
        <h1 className="font-semibold text-3xl text-blue-500">Message App</h1>
        <button
          onClick={signIn}
          aria-label="Continue with google"
          role="button"
          className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
            alt="google"
          />
          <p className="text-base font-medium ml-4 text-gray-700">
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
}

export default Login;
