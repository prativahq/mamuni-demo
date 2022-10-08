import React from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton } from '@coreui/react';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const ClientReports = () => {
    const CompanyData = [];
    let CampaignArray = [];
    const CSVurlArray = [];
    const CampaignFileUploadArr = [];
    const [CampaignFileUploadSelect, setCampaignFileUploadSelect] = useState([]);
    const [fetchreportcompany, setfetchreportcompany] = useState("");
    const [fetchCampaign, setfetchcampaign] = useState("");
    const [companydatasnap, setcompanydata] = useState([]);
    const [campaignssnap, setCampaigns] = useState([]);
    const [visibleCamp, setvisibleCamp] = useState(false);
    const [visibleCampReport, setvisibleCampReport] = useState(false)
    const [visiblereport, setVisiblereport] = useState(false);
    const [buttonselecttextprevious, setbuttonselecttextprevious] = useState("");
    const [CSVurl, setCSVurl] = useState([]);

    async function FetchCompanyData() {
        const querySnapshot = await getDocs(collection(db, "Company"));
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                CompanyData.push(doc.data());
            }
        });
        setcompanydata(CompanyData);
    }

    async function FetchCampaigns(CompanyNameFetch) {
        db.collection('Company').doc(CompanyNameFetch.toLowerCase()).collection("Campaign").onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                console.log(doc.data());
                CampaignArray.push(doc.data().CampaignName);
                setCampaigns(CampaignArray);
                CampaignFileUploadArr.push(doc.data().CompanyName);
                setCampaignFileUploadSelect(CampaignFileUploadArr);
            });
        })
    }
    // async function FetchCampaignData() {
    //   CampaignArray = [];
    //   const unsubscribe = db.collection('Company').doc("gide").collection('Campaign').onSnapshot(snapshot => {
    //     snapshot.docs.map(doc => {
    //       console.log("Campaign Data", "-->", doc.data());
    //       CampaignArray.push(doc.data().CampaignName);
    //     })
    //     setCampaigns(CampaignArray);
    //   });

    //   return unsubscribe;
    // }

    async function FetchReportData() {
        db.collection('Company').doc(fetchreportcompany.toLowerCase()).collection("Campaign").onSnapshot(snapshot => {
            snapshot.docs.map(doci => {
                if (doci.data().CampaignName === fetchCampaign) {
                    db.collection('Company').doc(fetchreportcompany).collection("Campaign").doc(doci.id).collection("Reports").onSnapshot(snapshot => {
                        snapshot.docs.map(doci => {
                            console.log(doci.id);
                            CSVurlArray.push(doci.data().fileURL);
                        });
                    });
                    setCSVurl(CSVurlArray);
                }
            })
        })
    }

    const manageuser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            } else {
                window.location.href = "/";
            }
        });
    }

    useEffect(() => {
        manageuser();
        FetchCompanyData();
    }, []);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-file-document"></i>
                    </span>Reports</h3>
            </div>
            <div className="row">
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">View Reports</h4>
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
                                        {/* setfetchreportcompany(item.CompanyName); setfetchcampaign(e.target.value) */}
                                        {companydatasnap.map((item) => (
                                            <tr>
                                                <td>{item.CompanyName}</td>
                                                <td>
                                                    <CButton onClick={() => { FetchCampaigns(item.CompanyName); setTimeout(() => { setvisibleCampReport(!visibleCamp) }, 1000) }}>{buttonselecttextprevious != "" ? buttonselecttextprevious.toUpperCase() : "Select Campaign"}</CButton>
                                                    <CModal visible={visibleCampReport} onClose={() => setvisibleCampReport(false)}>
                                                        <CModalHeader onClose={() => setvisibleCampReport(false)}>
                                                            <CModalTitle>Choose Your Campaign</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            {
                                                                campaignssnap.map((camp, i) => (
                                                                    <button type="button" onClick={() => { console.log(CampaignFileUploadSelect[i], camp); setbuttonselecttextprevious(camp); setfetchreportcompany(CampaignFileUploadSelect[i].toLowerCase()); setfetchcampaign(camp) }} style={{ marginLeft: "5px" }} className="btn btn-social-icon-text btn-twitter"><i className="mdi mdi-star-circle"></i>{camp}</button>
                                                                ))
                                                            }
                                                        </CModalBody>
                                                    </CModal>
                                                </td>
                                                <td style={{ width: "40%" }}>
                                                    <CButton onClick={() => { console.log(fetchCampaign, fetchreportcompany); FetchReportData(); setTimeout(() => { setVisiblereport(!visiblereport) }, 3000); }}>View Reports</CButton>
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
export default ClientReports;