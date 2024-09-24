// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIFn_l2xrOAhFm-ya6wT5bZaImWvZ07g8",
  authDomain: "expense-tracker-3bb9b.firebaseapp.com",
  projectId: "expense-tracker-3bb9b",
  storageBucket: "expense-tracker-3bb9b.appspot.com",
  messagingSenderId: "28070451786",
  appId: "1:28070451786:web:ec2c172c5d63671edf64b3",
  measurementId: "G-0WR463HHF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
