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
  apiKey: "AIzaSyCHQWVjvm7vHeQRwvfcMKX7ywadki4BdgY",
  authDomain: "pt-mamuni.firebaseapp.com",
  databaseURL: "https://pt-mamuni-default-rtdb.firebaseio.com",
  projectId: "pt-mamuni",
  storageBucket: "pt-mamuni.appspot.com",
  messagingSenderId: "150952987921",
  appId: "1:150952987921:web:1ab2d5be11c3deb70010b0",
  measurementId: "G-8XHSZ8LKV9"
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