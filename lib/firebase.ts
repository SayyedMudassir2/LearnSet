import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBijtCR9OkdowDKaaRrn6B-mTxEmmWZWMY",
  authDomain: "learnset-602bb.firebaseapp.com",
  projectId: "learnset-602bb",
  storageBucket: "learnset-602bb.appspot.com",
  messagingSenderId: "170925701946",
  appId: "1:170925701946:web:fdca675e7150242db16e03",
  measurementId: "G-G303D60CSR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
