import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCc_HEcGvXeTzcLCdwGFk2D3qcJC8kKmE",
  authDomain: "cripto-challenge.firebaseapp.com",
  projectId: "cripto-challenge",
  storageBucket: "cripto-challenge.appspot.com",
  messagingSenderId: "476825092206",
  appId: "1:476825092206:web:26138b0982dd0ed92fa67f"
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
