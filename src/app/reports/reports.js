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

const Reports = () => {
  const [startdate, setstartdate] = useState(new Date());
  const CompanyData = [];
  let CampaignArray = [];
  const CSVurlArray = [];
  const [UploadCSVCompany, setUploadCSVCompany] = useState("");
  const [reportUploadCampaign, setReportUploadCampaign] = useState("");
  const [fetchreportcompany, setfetchreportcompany] = useState("");
  const [fetchCampaign, setfetchcampaign] = useState("");
  const [companydatasnap, setcompanydata] = useState([]);
  const [campaignssnap, setCampaigns] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visiblereport, setVisiblereport] = useState(false)
  const [CSVurl, setCSVurl] = useState([]);
  const [campaign, setcampaign] = useState({
    CompanyName: "",
    CampaignName: ""
  });

  async function FetchCompanyData() {
    const querySnapshot = await getDocs(collection(db, "Company"));
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        CompanyData.push(doc.data());
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
          db.collection('Company').doc(UploadCSVCompany.toLowerCase()).collection("Campaign").onSnapshot(snapshot => {
            snapshot.docs.map(doci => {
              if (doci.data().CampaignName === reportUploadCampaign) {
                db.collection('Company').doc(UploadCSVCompany).collection("Campaign").doc(doci.id).collection("Reports").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  fileURL: url,
                  CreatedBy: auth.currentUser.email,
                }).then(() => {
                  toast.success('Report Uploaded :)', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                })
              }
            })
          })
        })
    })
  }

  async function FetchCampaigns(){
    
  }

  async function campaignCreate() {
    db.collection('Company').doc(campaign.CompanyName.toLowerCase()).collection('Campaign').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      CampaignName: campaign.CampaignName,
      CompanyName: campaign.CompanyName,
    }).then(() => {
      setVisible(false);
      toast.success('New Campaign Created :)', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }


  async function FetchCampaignData() {
    CampaignArray = [];
    const unsubscribe = db.collection('Company').doc("gide").collection('Campaign').onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        console.log("Campaign Data", "-->", doc.data());
        CampaignArray.push(doc.data().CampaignName);
      })
      setCampaigns(CampaignArray);
    });

    return unsubscribe;
  }

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
    FetchCampaignData();
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
          </span> Reports </h3>
      </div>
      <div className="row">
      </div>
      <div style={{ marginBottom: "30px", display: "flex", flexDirection: "row" }}>
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
                    {companydatasnap.map((item) => {
                      {/* console.log("in map" ,  campaignssnap); */ }

                      return (
                        <tr key={item.CompanyName}>
                          <td>{item.CompanyName}</td>
                          <td>
                            <select onChange={(e) => { setUploadCSVCompany(item.CompanyName); setReportUploadCampaign(e.target.value) }} className="form-control" id="exampleSelectGender">
                              <option>Select Your Campaign</option>
                              {
                                campaignssnap.map((item, i) => {
                                  return (
                                    <>
                                      <option value={item}>{item}</option>
                                    </>
                                  );
                                })
                              }
                            </select>
                          </td>
                          <td style={{ width: "40%" }}>
                            <div className="custom-file">
                              <Form.Control onChange={uploadCSVStream} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="form-control visibility-hidden" id="customFileLang" lang="es" />
                              <label className="custom-file-label" htmlFor="customFileLang">Upload CSV</label>

                            </div>
                          </td>
                        </tr>
                      )
                    })
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
                        <td>{item.CompanyName}</td>
                        <td>
                          <select onChange={(e) => { setfetchreportcompany(item.CompanyName); setfetchcampaign(e.target.value) }} className="form-control" id="exampleSelectGender">
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
                          <CButton onClick={() => { FetchReportData(); setTimeout(() => { setVisiblereport(!visiblereport) }, 3000); }}>View Reports</CButton>
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