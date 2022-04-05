import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD4SfKLzLACzymJfboLHrMmX9R-6hoKOj8",
  authDomain: "message-app-2d4f1.firebaseapp.com",
  projectId: "message-app-2d4f1",
  storageBucket: "message-app-2d4f1.appspot.com",
  messagingSenderId: "258702029602",
  appId: "1:258702029602:web:0fa6486eb2f94309f66b7b",
  measurementId: "G-JBK7DD8BV3",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore(); // access to database
const auth = app.auth(); // access to authentication
const provider = new firebase.auth.GoogleAuthProvider(); // access to provider

export { db, auth, provider };
