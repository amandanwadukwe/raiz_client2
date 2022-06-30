import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useSound from 'use-sound';
import success from '../resources/success.mp3';
import Popup from "./Popup";
import tick from "../resources/tick.png"

const date = new Date();

function NoticeBoard(props) {
    const [notices, setNotices] = useState([]);
    const [noticesError, setNoticesError] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [referenceNumber, setReferenceNumber] = useState(0);
    const [play] = useSound(success);
  
    useEffect(()=>{
        axios.get("https://raiz-server2.herokuapp.com/notice")
        .then(res => setNotices(res.data))
        .catch(err => setNoticesError("There has been an error with loading the notices"))
    }, [referenceNumber])
   

    function publishNotice(e) {
        e.preventDefault();

        axios
            .post("https://raiz-server2.herokuapp.com/notice", {
                "subject": subject,
                "message": message,
                "date": date,
            })
            .then(res => {
                console.log(res);
                //window.location.href = `http://localhost:3000/home/${email}`
            })
            .catch(err => {
                console.log(err);
                setNoticesError("There has been an error publishing this notice");
            });

          setMessage("");
          setSubject("");
          setPopupMessage("Notice published");
          togglePopup();
    }

    function deleteNotice(id) {
        axios.delete(`https://raiz-server2.herokuapp.com/notice/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const togglePopup = () => {
        setIsOpen(true);
        setTimeout(()=>console.log(setIsOpen(false)), 2000);
        play();
      }

    return (

        <div className={props.activeLink === "Home" || props.activeLink === "" ? "notice-container display" : "notice-container hide"}>
            <h3>Notice board</h3>
            <div className={noticesError.length > 0 ? "error-message display" : "error-message hide"}>{noticesError}</div>
            <div>
                {/* All notice items are to be displayed here */}
                <ul className="notice-list">
                    {
                        notices.map((notice, index) => {
                            return (<li className = {index >= referenceNumber && index <referenceNumber+2 ? "display" : "hide"}>
                                <div className="notice">
                                    <h2>{notice.subject}</h2>
                                    <p>{notice.message}</p>
                                    <span className="publisher"><i>@admin</i></span>
                                    <span className="date-published">{moment(notice.date).format("DD-MMM-YYYY")}</span>

                                    <button className={props.role === "Admin" ? "display" : "hide"} onClick={() => {
                                        deleteNotice(notice._id);
                                        setPopupMessage("Notice deleted")
                                        togglePopup()}} type="button">Delete</button>
                                </div>
                            </li>)
                        })
                    }
                </ul>
                <h3>Add new notice</h3>
                <div className="notice-list-control">
                    <button type="button" onClick={()=>{
                        if(referenceNumber <= 0 ){
                            setReferenceNumber(0)
                        } else{
                        setReferenceNumber(referenceNumber - 2)
                        }
                        }}>Previous notices</button>
                    <button type="button" onClick={()=>{
                        console.log("reference", referenceNumber)
                        if(referenceNumber >= notices.length - 2){
                            setReferenceNumber(notices.length - 2)
                        } else{
                        setReferenceNumber(referenceNumber + 2)
                        }
                        }}>More current notices</button>
                </div>
            </div>

            <form className={props.role === "Admin" ? "create-new-notice display" : "create-new-notice hide"}>
                <label>Subject: <input className="create-notice-title" onChange={(e) => setSubject(e.target.value)} value={subject} type="text" /></label><br />
                <label>Message: <textarea className="create-notice-message" onChange={(e) => setMessage(e.target.value)} value={message}></textarea></label><br />
                {/* In a form is it better to use an button input or a button tag? */}
                <button onClick={publishNotice} type="button">Publish</button>
            </form>

            <div className="info">
                <p><strong>RAIS</strong> is a local charity which provides advocacy, information and support services to refugees and asylum seekers living in Lancaster and Morecambe. All of our volunteers have experience of helping asylum seekers and refugees in our city, and are committed to welcoming and supporting them.</p>
            </div>
            <div className="info">
                <p>We provide information on matters including housing benefits, employment, education, family reunion and applying for indefinite leave to remain. We well refer of sighpost to other professsional agencies for advice where appropriate.</p>
                <p>We also provide advocacy for refugees in dealing iwth various agencies and organisations. Our volunteers can accompany people to appointments, and help with form-filling, application etc.</p>
                <p><strong>All enquires and any information given to us are treated in the strictest confidence. We never pass information to other people or agencies without the enquirer's permission.</strong></p>
            </div>

            {isOpen && <Popup
          content={<div className="popup-content">
            <b>{popupMessage}</b>
            
            <img className="success-image" src={tick} alt="successful deletion"/>
          </div>}
          handleClose={togglePopup}
        />}
        </div>
    );
}

export default NoticeBoard;