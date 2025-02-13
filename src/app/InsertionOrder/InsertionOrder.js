import React, { Component, useEffect, useState } from 'react';
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';
import { ProgressBar } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton } from '@coreui/react';
import { Form } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const ChartJs = () => {
    const [campaign, setcampaign] = useState({
        CompanyName: "",
        CampaignName: ""
    });
    const [visible, setVisible] = useState(false)



    const data = {
        labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: '# of Votes',
            data: [10, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
        }]
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0
            }
        }

    };

    const areaData = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: true, // 3: no fill
        }]
    };

    const areaOptions = {
        plugins: {
            filler: {
                propagate: true
            }
        }
    }

    const doughnutPieData = {
        datasets: [{
            data: [30, 40, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Pink',
            'Blue',
            'Yellow',
        ]
    };

    const doughnutPieOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    const scatterChartData = {
        datasets: [{
            label: 'First Dataset',
            data: [{
                x: -10,
                y: 0
            },
            {
                x: 0,
                y: 3
            },
            {
                x: -25,
                y: 5
            },
            {
                x: 40,
                y: 5
            }
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Second Dataset',
            data: [{
                x: 10,
                y: 5
            },
            {
                x: 20,
                y: -30
            },
            {
                x: -25,
                y: 15
            },
            {
                x: -10,
                y: 5
            }
            ],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }
        ]
    }

    const scatterChartOptions = {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
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

    setInterval(() => {
        manageuser();
    }, 1000);
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
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Pie Chart</h4>
                            <Pie data={doughnutPieData} options={doughnutPieOptions} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Doughnut Chart</h4>
                            <Doughnut data={doughnutPieData} options={doughnutPieOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "30px" }}>
                <Link to={"/cards"}>
                    <button type="button" className="btn btn-gradient-success btn-fw">New Insertion order</button>
                </Link>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        {/* <h4 className="card-title">Bordered table</h4> */}
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", gap: 30 }}>
                            <div className='card-description'>filter</div>
                            <div style={{ color: "#E0E0E0", borderRadius: "30px" }} className="status">
                                <span style={{ paddingTop: "20px" }}>Status: Active</span>
                                <i style={{ marginLeft: "5px" }} color='#616161' class="remove mdi mdi-close-circle-outline"></i></div>
                            <div className='card-description'>Add filter</div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowSpan={"2"}> <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> </th>
                                        <th colSpan={"3"}> Delivery and Interactions </th>
                                        <th colSpan={"2"}> Pacing </th>
                                        <th colSpan={"1"}> Insertion Order Status </th>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <th>Impressions</th>
                                        <th>Revenue</th>
                                        <th>Budget At risk</th>
                                        <th>Current budget</th>
                                        <th>Underpacing/Total Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> </td>
                                        <td style={{ color: "blue" }} className="text-link"> Upswiit </td>
                                        <td> <span className='card-description'>884535039</span> 1,970,023 </td>
                                        <td> ₹28,043.68 </td>
                                        <td> ₹291,978.11 </td>
                                        <td> ₹870,120,35 </td>
                                        <td> <span className='text-link'>2</span>/9 </td>
                                    </tr>
                                    {/* <tr>
                      <td> <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          <i className="input-helper"></i>
                        </label>
                      </div> </td>
                      <td> Messsy Adam </td>
                      <td>
                        <ProgressBar variant="danger" now={75} />
                      </td>
                      <td> $245.30 </td>
                      <td> July 1, 2015 </td>
                    </tr>
                    <tr>
                      <td> <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          <i className="input-helper"></i>
                        </label>
                      </div> </td>
                      <td> John Richards </td>
                      <td>
                        <ProgressBar variant="warning" now={90} />
                      </td>
                      <td> $138.00 </td>
                      <td> Apr 12, 2015 </td>
                    </tr> */}
                                    {/* <tr>
                      <td> 4 </td>
                      <td> Peter Meggik </td>
                      <td>
                        <ProgressBar variant="primary" now={50} />
                      </td>
                      <td> $ 77.99 </td>
                      <td> May 15, 2015 </td>
                    </tr>
                    <tr>
                      <td> 5 </td>
                      <td> Edward </td>
                      <td>
                        <ProgressBar variant="danger" now={35} />
                      </td>
                      <td> $ 160.25 </td>
                      <td> May 03, 2015 </td>
                    </tr>
                    <tr>
                      <td> 6 </td>
                      <td> John Doe </td>
                      <td>
                        <ProgressBar variant="info" now={65} />
                      </td>
                      <td> $ 123.21 </td>
                      <td> April 05, 2015 </td>
                    </tr>
                    <tr>
                      <td> 7 </td>
                      <td> Henry Tom </td>
                      <td>
                        <ProgressBar now={60} />
                        <ProgressBar variant="warning" now={20} />
                      </td>
                      <td> $ 150.00 </td>
                      <td> June 16, 2015 </td>
                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ChartJs