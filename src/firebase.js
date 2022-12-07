// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTHTKQ-UL6oFwCZLDkmLl8P-2n_5muYv0",
  authDomain: "fir-auth-ea9c8.firebaseapp.com",
  projectId: "fir-auth-ea9c8",
  storageBucket: "fir-auth-ea9c8.appspot.com",
  messagingSenderId: "84723535228",
  appId: "1:84723535228:web:a77d5f48d7bdabb6bc28f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
