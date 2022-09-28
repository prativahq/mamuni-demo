// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
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
let app;

if(firebase.apps.length==0){
app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth()
const storage = app.storage();

export {db , auth , storage};