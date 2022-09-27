import React, { Component, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


const Login = () => {

  const [email, setemail] = useState("");
  const provider = new GoogleAuthProvider();
  const [password, setpassword] = useState("");

  function signwithemail() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  
  const manageuser = ()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        window.location.href = "/dashboard";
        // ...
      } else {
        // User is signed out
        // <Redirect to={"/"} />
        // window.location.href = "/";
        // ...
      }
    });
  }

  useEffect(() => {
    const subs = manageuser();

    // return subs;
  }, []);





  function loginwithgoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 justify-content-center">
          <div className="col-lg-4" style={{ width: "100%" }}>
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/prommatic-logo.png")} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control onChange={(e) => setemail(e.target.value)} type="email" placeholder="Username" size="lg" className="h-auto" />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" size="lg" className="h-auto" />
                </Form.Group>
                <div className="mt-3">
                  <Link onClick={signwithemail} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</Link>
                </div>
                {/* <div className="my-2 d-flex justify-content-between align-items-center">
                  <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                </div> */}
                <div className="mb-2 mt-3">
                  <button onClick={loginwithgoogle} type="button" className="btn btn-block btn-google auth-form-btn">
                    <i className="mdi mdi-google mr-2"></i>login using Google
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login
