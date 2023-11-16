// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxASJYPVrJryuxqJp3JkIgoeUXXo9Ue5o",
  authDomain: "final-project-ort.firebaseapp.com",
  projectId: "final-project-ort",
  storageBucket: "final-project-ort.appspot.com",
  messagingSenderId: "356107647783",
  appId: "1:356107647783:web:b7aedf78d21d023f93c702",
  measurementId: "G-BYP0XFJGCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth=getAuth(app);

export const db = getFirestore(app);

