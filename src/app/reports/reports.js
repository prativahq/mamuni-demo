import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
// import '@coreui/coreui/dist/css/coreui.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton } from '@coreui/react';
import DatePicker from "react-datepicker";

import { Form } from 'react-bootstrap';
// import DatePicker from "react-datepicker";
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react';
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useLayoutEffect } from 'react';

// import "react-datepicker/dist/react-datepicker.css";



const Reports = () => {

  const [authid, setauthid] = useState("");
  const [companyName , setCompanyName] = useState("Kile");
  const [test , settest] = useState({});
  function authidGenerator() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        db.collection("CompanyDetails").doc(uid)
          .onSnapshot((doc) => {
            console.log("CompanyName data: ", doc.data());
            settest(doc.data());
          });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    setCompanyName(test.CompanyName);
  }

  useEffect(() => {
    authidGenerator();
  }, []);

  const [startdate, setstartdate] = useState(new Date());
  const CompanyData = [];
  let CampaignArray = [];
  const [reportUploadCampaign, setReportUploadCampaign] = useState("");
  const [companydatasnap, setcompanydata] = useState([]);
  const [campaignssnap, setCampaigns] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visiblereport, setVisiblereport] = useState(false)
  const CSVurlArray = [];
  const [CSVurl, setCSVurl] = useState([]);
  const [campaign, setcampaign] = useState({
    CompanyName: "",
    CampaignName: ""
  });

  async function FetchCompanyData() {
    const querySnapshot = await getDocs(collection(db, "Company"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());
      if (doc.exists()) {
        CompanyData.push(doc.data());
      }
      else {

      }
    });
    setcompanydata(CompanyData);
  }

  async function uploadCSVStream(e) {
    if (reportUploadCampaign === "") {
      alert("Please Select Campaign!!!");
      return;
    }
    const file = e.target.files[0];
    const storageRef = ref(storage, `${reportUploadCampaign}/${file.name + uuidv4()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          // Insert url into an <img> tag to "download"
          db.collection('Company').doc(companyName).collection("Campaign").doc("jl25xfDvmrVvW8eFJ7to").collection("Reports").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            fileURL: url,
            CreatedBy: auth.currentUser.email,
          });
          alert("Uploaded");
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });
      alert("Uploaded");
    });
  }

  async function campaignCreate() {
    db.collection('Company').doc(campaign.CompanyName).collection('Campaign').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      CampaignName: campaign.CampaignName,
      CompanyName: campaign.CompanyName,
    });
  }

  async function FetchCampaignData() {
    CampaignArray = [];
    const unsubscribe = db.collection('Company').doc(companyName).collection('Campaign').onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        console.log("Campaign Data", "-->", doc.data());
        CampaignArray.push(doc.data().CampaignName);
      })
      setCampaigns(CampaignArray);
    });

    return unsubscribe;
  }

  async function FetchReportData() {
    const unsubscribe = db.collection('Company').doc(companyName).collection('Campaign').doc("jl25xfDvmrVvW8eFJ7to").collection("Reports").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        console.log("Report", doc.data());
        CSVurlArray.push(
          doc.data().fileURL
        );
      })
      setCSVurl(CSVurlArray);
    });
    return unsubscribe;
  }




  useEffect(() => {
    FetchCompanyData();
    FetchReportData();
    FetchCampaignData();
  }, []);





  function toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }

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
      <div className="page-header">
        <h3 className="page-title">
          <span onClick={()=>console.log(test)} className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-file-document"></i>
          </span> Reports </h3>
      </div>
      <div className="row">
      </div>
      <div style={{ marginBottom: "30px", display: "flex", flexDirection: "row" }}>
        <Link to={"/cards"}>
          <button type="button" className="btn btn-gradient-success btn-fw">New Insertion order</button>
        </Link>
        <CButton onClick={() => setVisible(!visible)}>Create Campaign</CButton>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Campaign Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <label htmlFor="exampleInputName1">Company Name</label>
            <Form.Control onChange={(e) => setcampaign({ ...campaign, CompanyName: e.target.value })} type="text" className="form-control" id="exampleInputName1" placeholder="Company Name" />
            <label htmlFor="exampleInputName2" className='mt-4'>Campaign Name</label>
            <Form.Control type="text" onChange={(e) => setcampaign({ ...campaign, CampaignName: e.target.value })} className="form-control" id="exampleInputName2" placeholder="Campaign Name" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={campaignCreate}>Create</CButton>
          </CModalFooter>
        </CModal>
        <DatePicker className="form-control w-100"
          selected={startdate}
          onChange={e => setstartdate(e)}
        />
        <Dropdown>
          <Dropdown.Toggle variant="btn" id="dropdownMenuOutlineButton1">
            Performance
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Basic</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>High</Dropdown.Item>
            <Dropdown.Item>Extreme</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Reports</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Company Name </th>
                      <th> Campaign Name </th>
                      <th> Upload Report </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companydatasnap.map((item) => (
                      <tr>
                        <td>{item.CompanyName}</td>
                        <td>
                          <select onChange={(e) => { console.log(e.target.value); setReportUploadCampaign(e.target.value) }} className="form-control" id="exampleSelectGender">
                            <option> </option>
                            {
                              campaignssnap.map((item) => (
                                <>
                                  <option value={item}>{item}</option>
                                </>
                              ))
                            }
                          </select>
                        </td>
                        <td style={{ width: "40%" }}>
                          <div className="custom-file">
                            <Form.Control onChange={uploadCSVStream} type="file" accept='.csv' className="form-control visibility-hidden" id="customFileLang" lang="es" />
                            <label className="custom-file-label" htmlFor="customFileLang">Upload CSV</label>

                          </div>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Previous Reports</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Company Name </th>
                      <th> Campaign Name </th>
                      <th> Reports </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companydatasnap.map((item) => (
                      <tr>
                        <td onClick={() => console.log()}>{item.CompanyName}</td>
                        <td onClick={() => console.log(CompanyData.length)}>
                          <select onChange={(e) => { console.log(e.target.value); setReportUploadCampaign(e.target.value) }} className="form-control" id="exampleSelectGender">
                            <option>Select Your Campaign</option>
                            {
                              campaignssnap.map((item) => (
                                <>
                                  <option value={item}>{item}</option>
                                </>
                              ))
                            }
                          </select>
                        </td>
                        <td style={{ width: "40%" }}>
                          <CButton onClick={() => setVisiblereport(!visiblereport)}>View Reports</CButton>
                          <CModal visible={visiblereport} onClose={() => setVisiblereport(false)}>
                            <CModalHeader onClose={() => setVisiblereport(false)}>
                              <CModalTitle>Previous Reports</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th> Report Name </th>
                                      <th> Source </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {CSVurl.map((item, idx) => (
                                      <tr>
                                        <td>
                                          {`Report ${idx + 1}`}
                                        </td>
                                        <td>
                                          <i className="mdi mdi-file-document icon-sm text-danger"></i>
                                          <span className="mb-0 ml-1"><a href={item} style={{ textDecoration: "none" }}>Link</a></span>
                                        </td>
                                      </tr>
                                    ))
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </CModalBody>
                            <CModalFooter>
                              <CButton color="secondary" onClick={() => setVisiblereport(false)}>
                                Close
                              </CButton>
                            </CModalFooter>
                          </CModal>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reports;