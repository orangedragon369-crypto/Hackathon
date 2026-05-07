// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN0x8YNUAdCL8ydKtDOHN4Fx00PVUnFkg",
  authDomain: "mconnect-78e3c.firebaseapp.com",
  projectId: "mconnect-78e3c",
  storageBucket: "mconnect-78e3c.firebasestorage.app",
  messagingSenderId: "978476572460",
  appId: "1:978476572460:web:e6bede76bb42652bfed689",
  measurementId: "G-KC6C0JQWYR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
