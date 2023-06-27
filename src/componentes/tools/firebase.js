import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDGC17soOniwvUsnMHNncXiTo4GSVdvmNY",
  authDomain: "superpig-a3367.firebaseapp.com",
  projectId: "superpig-a3367",
  storageBucket: "superpig-a3367.appspot.com",
  messagingSenderId: "3305123578",
  appId: "1:3305123578:web:40777a6e7de93654256343"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)