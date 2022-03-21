import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";
import axios from "axios";

const collectionName = "operations";

export const saveOperation = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateOperation = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getOperations = () => getDocs(collection(db, collectionName));

export const deleteOperation = (id) => deleteDoc(doc(db, collectionName, id));

export const getOperation = (id) => getDoc(doc(db, collectionName, id));

export const getTokens = () =>
  fetch(
    "https://api.nomics.com/v1/currencies/ticker?key=738352bbe129b05bccb9929efc3f4fd1ea2a2419&per-page=100&page=1"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
