import React from "react";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  increment,
  getDoc,
  query,where,getDocs
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { useContext, createContext } from "react";

const FirestoreContext = createContext();

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
  async function addFS(uid, data) {
    await setDoc(doc(db, "Users", uid), data);
  }
  async function addFsForum(uid, data) {
    await setDoc(doc(db, "Forum", uid), data);
  }

  async function updateFS(uid, field, value) {
    const UserRef = doc(db, "Users", uid);
    await updateDoc(UserRef, {
      [field]: value,
    });
  }
  async function getWholeCollection(type) {
    const q = query(collection(db, type));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    return querySnapshot;
  }

  async function deleteFS(uid) {
    await deleteDoc(doc(db, "Users", uid));
  }
  async function getDataFS(uid) {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  async function getDataFsForum(uid) {
    const docRef = doc(db, "Forum", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const value = {
    addFS,
    updateFS,
    deleteFS,
    getDataFS,
    addFsForum,
    getDataFsForum,
    getWholeCollection,
  };
  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
