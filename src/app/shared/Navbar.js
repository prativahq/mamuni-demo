import React, { Component, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { auth, db } from "../firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";


const Navbar = (props) => {
  function toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  function toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

  const [companyName, setCompanyName] = useState("");
  const authid = auth.currentUser.uid;

  async function fetchCompanyName() {
    const docRef = doc(db, "CompanyDetails", authid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCompanyName(docSnap.data().CompanyName);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      // setCompanyName(Name);
      // return unsub;
    }
  }

  useEffect(() => {
    fetchCompanyName();
  }, []);



  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/"><img style={{ height: "50px", width: "50px" }} src={require('../../assets/images/Mamuni logo transparent.png')} alt="logo" /></Link>
        {/* <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logo.jpeg')} alt="logo" /></Link> */}
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
          <span className="mdi mdi-menu"></span>
        </button>
        <div className="search-field d-none d-md-block">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
              </div>
              <h3 style={{ color: "black" }}>{companyName}</h3>
            </div>
          </form>
        </div>
        <ul className="navbar-nav navbar-nav-right">
          {/* <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="!#" onClick={event => event.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-magnify"></i>
            </a>
          </li>
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="!#" onClick={event => event.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-bell"></i>
            </a>
          </li>
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="!#" onClick={event => event.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-account-multiple"></i>
            </a>
          </li>
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="#!" onClick={e => e.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-file-multiple"></i>
            </a>
          </li>
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="#!" onClick={e => e.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li> 
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="#!" onClick={e => e.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-comment-question-outline menu-icon"></i>
            </a>
          </li>
          <li className="nav-item nav-logout d-none d-lg-block">
            <a className="nav-link" href="#!" onClick={e => e.preventDefault()}>
              <i style={{ fontSize: "25px", color: "#A962FF" }} className="mdi mdi-table menu-icon"></i>
            </a>
          </li> */}
          <li className="nav-item nav-profile">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link">
                <div className="nav-profile-img">
                  <img src={props.photo != null ? props.photo : require("../../assets/images/faces/face1.jpg")} alt="user" />
                  <span className="availability-status online"></span>
                </div>
                {/* <div className="nav-profile-text">
                    <p className="mb-1 text-black"><Trans>David Greymaax</Trans></p>
                  </div> */}
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown">
                {/* <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()}>
                  <i className="mdi mdi-account-card-details mr-2 text-success"></i>
                  <Trans>Profile</Trans>
                </Dropdown.Item>
                <Dropdown.Item href="http://localhost:3000/google">
                  <a style={{ textDecoration: "none", color: "black" }}>
                    <i className="mdi mdi-access-point mr-2 text-info"></i>
                    <Trans>Activate Token</Trans>
                  </a>
                </Dropdown.Item> */}
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()}>
                  <Link onClick={() => auth.signOut()} style={{ textDecoration: "none", color: "black" }}>
                    <i className="mdi mdi-logout mr-2 text-primary"></i>
                    <Trans>Signout</Trans>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {/* <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="mdi mdi-email-outline"></i>
                  <span className="count-symbol bg-warning"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <h6 className="p-3 mb-0"><Trans>Messages</Trans></h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={require("../../assets/images/faces/face4.jpg")} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Mark send you a message</Trans></h6>
                      <p className="text-gray mb-0">
                        1 <Trans>Minutes ago</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={require("../../assets/images/faces/face2.jpg")} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Cregh send you a message</Trans></h6>
                      <p className="text-gray mb-0">
                        15 <Trans>Minutes ago</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src={require("../../assets/images/faces/face3.jpg")} alt="user" className="profile-pic"/>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Profile picture updated</Trans></h6>
                      <p className="text-gray mb-0">
                        18 <Trans>Minutes ago</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">4 <Trans>new messages</Trans></h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="mdi mdi-bell-outline"></i>
                  <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0"><Trans>Notifications</Trans></h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="mdi mdi-calendar"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"><Trans>Event today</Trans></h6>
                      <p className="text-gray ellipsis mb-0">
                      <Trans>Just a reminder that you have an event today</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="mdi mdi-settings"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"><Trans>Settings</Trans></h6>
                      <p className="text-gray ellipsis mb-0">
                      <Trans>Update dashboard</Trans>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-link-variant"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1"><Trans>Launch Admin</Trans></h6>
                      <p className="text-gray ellipsis mb-0">
                      <Trans>New admin wow</Trans>!
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer"><Trans>See all notifications</Trans></h6>
                </Dropdown.Menu>
              </Dropdown>
            </li> */}
          {/* <li className="nav-item nav-settings d-none d-lg-block">
              <button type="button" className="nav-link border-0" onClick={toggleRightSidebar} >
                <i className="mdi mdi-format-line-spacing"></i>
              </button>
            </li> */}
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}


export default Navbar;
