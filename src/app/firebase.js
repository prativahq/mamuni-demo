// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2oMMV9-6EhgIRV0D37MUIyCHjy0iDV4U",
  authDomain: "promatic-9049c.firebaseapp.com",
  projectId: "promatic-9049c",
  storageBucket: "promatic-9049c.appspot.com",
  messagingSenderId: "350456617499",
  appId: "1:350456617499:web:93b060582569289d1c36be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export default app;
export {db,auth,storage};