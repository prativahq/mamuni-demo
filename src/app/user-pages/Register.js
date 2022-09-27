import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {

  const [email, setemail] = useState("");
  const [password, setPassowrd] = useState("");

  function createuser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 justify-content-center">
          <div className="col-lg-4" style={{width: "100%"}}>
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/prommatic-logo.png")} alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
              <form className="pt-3">
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Name" autoComplete={false} autoCapitalize={false} autoSave={false} />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" onChange={(e) => setemail(e.target.value)} placeholder="Email" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" onChange={(e) => setPassowrd(e.target.value)} placeholder="Password" />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      I agree to all Terms & Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <Link onClick={createuser} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account? <Link to="/" className="text-primary">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Register
