import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './insertion.scss';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'
const Insertion_cards = () => {

  const manageuser = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // window.location.href = "/dashboard";
        // ...
      } else {
        // User is signed out
        // <Redirect to={"/"} />
        window.location.href = "/";
        // ...
      }
    });
  }

  useEffect(() => {
    manageuser();
  }, []);
  return (
    <div>
    <div>
      <Link to={"/charts/chart-js"}>
      <button type="button" style={{position: "absolute" , zIndex: 50 , right: "20px" , top: "80px"}} className="btn btn-gradient-danger btn-rounded btn-icon">
        <i className="mdi mdi-close"></i>
      </button>
      </Link>
      </div>
      <div class="main-card" style={{marginTop: "50px"}}>
        {/* // Card One */}
        <Link to={"/insertion-form"}>
          <div class="container">
            <img src='https://user-images.githubusercontent.com/86917304/191945165-7347847a-c15a-4672-b78f-64303b4101ae.png' alt='profile' style={{ marginLeft: "-8px", borderRadius: "10px", marginBottom: "20px" }} />
            <div class="container__profile">
              <div class="container__profile__text">
                <h2>Real-time bidding</h2>
                <p>Open Auction line item serving on Display & Video 360.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Catd Two */}
        <div class="container">
          <img src='https://user-images.githubusercontent.com/86917304/191945187-e43ceb36-621f-45e1-a368-c65959b9b5a5.png' alt='profile' style={{ marginLeft: "-8px", borderRadius: "10px" }} />
          <div class="container__profile">
            <div class="container__profile__text">
              <h2>Story</h2>
              <p>Show creativites in  a sequence.</p>
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div class="container">
          <img src='https://user-images.githubusercontent.com/86917304/191945213-7b2a71fc-c2ff-41b5-a447-783d4e2f7739.png' alt='profile' style={{ marginLeft: "-8px", borderRadius: "10px" }} />
          <div class="container__profile">
            <div class="container__profile__text">
              <h2>Connected TV and OTT streaming</h2>
              <p>TV content across over-the-top streaming devices.</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div class="container">
          <img src='https://user-images.githubusercontent.com/86917304/191945249-280e1aee-417d-4a31-9973-5ec2bb042f57.png' alt='profile' style={{ marginLeft: "-8px", borderRadius: "10px" }} />
          <div class="container__profile">
            <div class="container__profile__text">
              <h2>Digital Our of Home</h2>
              <p>Digital Out of Home ads that serve on billboards , bus , stations , airports etc.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Insertion_cards;
