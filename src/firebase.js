import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALgnhjXmyfE3KwMPKIJxEG-utPjvDzhjQ",
  authDomain: "facultyblogs-5494a.firebaseapp.com",
  projectId: "facultyblogs-5494a",
  storageBucket: "facultyblogs-5494a.firebasestorage.app",
  messagingSenderId: "299579855543",
  appId: "1:299579855543:web:8aa5c8208fa2f87d55f332",
  measurementId: "G-HLJP3TLEDD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
