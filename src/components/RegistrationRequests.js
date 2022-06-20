import React, { useState } from "react";
import axios from "axios";


function RegistrationRequests(props) {
    const [requests, setRequests] = useState([]);
    const [requestError, setRequestError] = useState("");
    //The request the admin is currently taking action on 
    //const [currentRequest, setCurrentRequest] = useState("");

    axios.get(`http://localhost:5000/user/`)
        .then(res => {
            setRequests(res.data.filter(user => user.role === "Pending..."));
        })
        .catch(err => setRequestError("There has been an error loading the requests"));

    function acceptRequest(email) {

        axios.put(`http://localhost:5000/user/${email}`)
            .then(res => console.log(res))
            .catch(err => setRequestError("There has been an error accepting this request"))

    }

    function deleteRequest(email) {
        axios.delete(`http://localhost:5000/user/${email}`)
            .then(res => console.log(res))
            .catch(err => setRequestError("There has been an error declining this request"))
    }

    return (
        <div className={props.activeLink === "Requests" && props.role==="Admin" ? "registration-request-container display" : "registration-request-container hide"}>
            {requests.length > 0 ? (
            <ul className="registration-request-list">
                {requests.map(request => {
                    //console.log(request);
                    return (
                        <li><div><h1>{request.firstName} {request.lastName} </h1><button className="primary-btn" onClick={(e) => {
                            e.preventDefault();
                            // setCurrentRequest(request.email);
                            // console.log("email:", typeof request.email);
                            // console.log(currentRequest);
                            acceptRequest(request.email);
                            axios.post("http://localhost:5000/request_accepted", {
                                    "email":request.email
                                })
                                .then(res=> console.log(res))
                                .catch(err => console.log(err))
                              
                            
                            //console.log(currentRequest);
                        }} type="button">Accept</button> <button className="danger-btn" onClick={(e) => {
                            e.preventDefault();
                            axios.post("http://localhost:5000/request_denied", {
                                    "email":request.email
                                })
                                .then(res=> console.log(res))
                                .catch(err => console.log(err))
                           
                            deleteRequest(request.email);

                        }} type="button">Decline</button>
                        </div></li>
                    )
                })}
            </ul>):(<h1>There are no registration requests</h1>)}
        </div>
    )
}

export default RegistrationRequests;