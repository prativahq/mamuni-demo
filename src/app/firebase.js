// Import the functions you need from the SDKs you need

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { initializeApp } from "firebase/app";

//import firebaseConfig from './../firebase/firebaseconfig.js'





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_Id,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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