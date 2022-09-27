import React, { Component, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import './Order.css';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'

const Order_Forms = () => {
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
    const [startDate, setstartdate] = useState(new Date());
    const [limit, setlimit] = useState("");
    const [Target, setTarget] = useState("");
    return (
        <>
            <h3 className="card-title" style={{ marginBottom: "50px" }}>New insertion order</h3>
            <div className="col-12 grid-margin stretch-card" style={{ marginTop: "-20px" }}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Insertion order Name</h4>
                        <Form.Group>
                            <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                            <label htmlFor="exampleFormControlSelect3"></label>
                            <select defaultValue={"Draft"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>Draft</option>
                                <option>Active</option>
                            </select>
                        </Form.Group>
                    </div>
                </div>
            </div>
            <h6 style={{ marginLeft: "15px" }}><span> <i className="mdi mdi-settings"></i></span> Budget and pacing depend on both insertion order and line item settings.</h6>
            <div className="col-12 grid-margin stretch-card" >
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Budget</h4>
                        <Form.Group>
                            <label htmlFor="exampleFormControlSelect3">Select Your budget type</label>
                            <select defaultValue={"INR"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>INR</option>
                                <option>Impressions</option>
                            </select>

                            <p style={{ marginTop: "20px" }}>*Specify this insertion order's flight dates and budget segments</p>
                            <label htmlFor='exampleInputName1'>Budget</label>
                            <Form.Control type="number" className="form-control" id="exampleInputName1" placeholder="Budget" defaultValue={"₹0"} />
                            <label htmlFor='exampleInputName2'>Description</label>
                            <Form.Control type="text" className="form-control" id="exampleInputName2" />

                            <label className="col-sm-3 col-form-label">Start Date</label>
                            <Form.Control type="date" className="form-control" id="exampleInputName1" placeholder="Budget" defaultValue={new Date()} />

                            <label className="col-sm-3 col-form-label">End Date</label>
                            <Form.Control type="date" className="form-control" id="exampleInputName1" placeholder="Budget" defaultValue={new Date()} />
                            <div class="mt-4 alert alert-info"
                                style={{ padding: "20px 20px" }} role="alert">
                                Your campaign's planned budget couldn't be loaded, so it's possible this budget segment will exceed your planned campaign budget
                            </div>

                            <a class='add-seg' style={{ fontWeight: "600", color: "#488BF5", width: "content-fit", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>ADD SEGMENTS</a>





                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* pacing */}
            <div className="col-12 grid-margin stretch-card" >
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Pacing</h4>
                        <Form.Group>
                            <label htmlFor="exampleInputName1">How do you want to spend the flight budget?</label> <br />
                            <select style={{ marginTop: "15px" }} defaultValue={"Flight (Recommended)"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>Flight (Recommended)</option>
                                <option>Daily</option>
                            </select>
                            <select style={{ marginTop: "15px" }} defaultValue={"Ahead"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>ASAP</option>
                                <option>Even</option>
                                <option>Ahead</option>
                            </select>

                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* Goal */}
            <div className="col-12 grid-margin stretch-card">
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Goal</h4>
                        <Form.Group>
                            <label htmlFor="exampleInputName1">What goal would you like to focus on?</label>
                            <select defaultValue={"Cost per thousand impressions (CPM)"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>Cost per thousand impressions (CPM)</option>
                                <option>Impressions</option>
                            </select>
                        </Form.Group>
                    </div>
                </div>
            </div>
            {/* Billabe Outcome */}
            <div className="col-12 grid-margin stretch-card">
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Billabe Outcome</h4>
                        <Form.Group>
                            <label htmlFor="exampleInputName1">
                                What would you like to pay for?</label>
                            <select defaultValue={"Impressions"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>Impressions</option>
                                <option>Clicks</option>
                                <option>Active View: Viewable Impressions</option>
                            </select>
                        </Form.Group>
                    </div>
                </div>
            </div>
            {/* Optimization */}
            <div className="col-12 grid-margin stretch-card" >
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Optimization</h4>
                        <Form.Group>
                            <label htmlFor="exampleInputName1">Optimization</label>
                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* Frequency Cap */}
            <div className="col-12 grid-margin stretch-card" >
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Frequency</h4>
                        <Form.Group>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="nolimit" />
                                    <i className="input-helper"></i>
                                    No limit
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="limitfreq" onChange={(e) => setlimit(e.target.value)} />
                                    <i className="input-helper"></i>
                                    Limit frequency to
                                </label>
                            </div>
                            <p>Exposes per</p>
                            <select disabled={limit === ""} defaultValue={"Lifetime"} className="form-control form-control-sm" id="exampleFormControlSelect3">
                                <option>Lifetime</option>
                                <option>Months</option>
                                <option>Weeks</option>
                                <option>Days</option>
                                <option>Days</option>
                                <option>Hours</option>
                                <option>Minutes</option>
                            </select>

                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* Targeting */}
            <div className="col-12 grid-margin stretch-card" >
                <div className='card'>
                    <div className="card-body">
                        <h4 className="card-title">Targeting</h4>
                        <Form.Group>
                            <h6 style={{ marginLeft: "15px" }}><span> <i className="mdi mdi-settings"></i></span> New line items in this insertion order will inherit these settings. Targeting set on insertion orders doesn't apply to YouTube & partners line items.</h6>
                            <Dropdown>
                                <Dropdown.Toggle variant="btn" id="dropdownMenuOutlineButton1">
                                    Add Targeting
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Content</Dropdown.Header>
                                    <Dropdown.Item onClick={() => setTarget("Brand safety")}>Brand safety</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Apps & URL's</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Keywords</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Categories</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Environment</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Position</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Viewability</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Language</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Audio & video</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>User-rewarded content</Dropdown.Item>
                                    <Dropdown.Divider></Dropdown.Divider>
                                    <Dropdown.Header>Audience</Dropdown.Header>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Audience lists</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Geography</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Day & time</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Demographics</Dropdown.Item>
                                    <Dropdown.Divider></Dropdown.Divider>
                                    <Dropdown.Header>Technology</Dropdown.Header>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Browser</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Device</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Connection speed</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => console.log(e.target.value)}>Carrier & ISP</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Form.Group>
                    </div>
                </div>
            </div>
            <div onClick={() => console.log(Target)} style={{ marginLeft: "24px" }}>
                <button type="button" className="btn btn-info btn-fw">Create</button>
                <button type="button" style={{ marginLeft: "20px" }} className="btn btn-dark btn-fw">Cancel</button>
            </div>
        </>
    )
}

export default Order_Forms
