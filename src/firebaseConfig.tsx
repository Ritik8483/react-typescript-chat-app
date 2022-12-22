import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC3MzBDtTGrSGpyTEx9xAjWu7URaylISY",
  authDomain: "web-chat-app-457f3.firebaseapp.com",
  projectId: "web-chat-app-457f3",
  storageBucket: "web-chat-app-457f3.appspot.com",
  messagingSenderId: "917354696874",
  appId: "1:917354696874:web:ce0296f1b2dd29459340d3",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const FirebaseDatabase = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { auth, provider, db, FirebaseDatabase, storage };
