import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import useSound from 'use-sound';
import success from '../resources/success.mp3';
import wormy1 from "../resources/wormy1.png";
import wormy2 from "../resources/wormy2.png";
import wormy3 from "../resources/wormy3.png";
import wormy4 from "../resources/wormy4.png";
import wormy5 from "../resources/wormy5.png";
import Popup from "./Popup";
import tick from "../resources/tick.png";

function Account(props) {
    const [route, setRoute] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isWormy1, setIsWormy1] = useState(false);
    const [isWormy2, setIsWormy2] = useState(false);
    const [isWormy3, setIsWormy3] = useState(false);
    const [isWormy4, setIsWormy4] = useState(false);
    const [isWormy5, setIsWormy5] = useState(false);
    const [showAvatarChoices, setShowAvatarChoices] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [play] = useSound(success);

    let image = "";
    if (avatar === "../resources/wormy1.png") {
        image = wormy1;
    } else if (avatar === "../resources/wormy2.png") {
        image = wormy2;
    } else if (avatar === "../resources/wormy3.png") {
        image = wormy3;
    } else if (avatar === "../resources/wormy4.png") {
        image = wormy4;
    } else {
        image = wormy5
    }
    function changePassword() {
        setPopupMessage("Password Changed")
        axios.put("https://raiz-server2.herokuapp.com/password", {
            "email": props.email,
            "newPassword": newPassword
        })

            .then(res => console.log(res))
            .catch(err => console.log(err))

        setNewPassword("");
        setShowPasswordInput(false);
        showConfirmation();
    }

    function changeAvatar() {
        console.log(route)
        axios.put("https://raiz-server2.herokuapp.com/avatar", {
            "email": props.email,
            "route": route
        })

            .then(res => console.log(res))
            .catch(err => console.log(err))

    }
    axios.get(`https://raiz-server2.herokuapp.com/user/${props.email}`)
        .then(res => {
            setAvatar(res.data[0].avatar)

        })
        .catch(err => console.log(err));

    function showConfirmation() {
        setIsOpen(true);
        setTimeout(() => console.log(setIsOpen(false)), 2000);
        play();
    }
    return <div className={props.activeLink === "My Account" ? "account-container display" : "account-container hide"} >
        
                <div className="profile-details">
                    <img className="avatar" src={image} alt="Bubble" /><br />
                    <h2>{props.firstName} {props.lastName}</h2><br></br>
                    <span>{props.email}</span><br /><br />
                    <span className="role"><b>{props.role}</b></span><br /><br />
                    <span>Joined on:<br /> {moment(props.dateJoined).format('DD-MMM-YYYY')}</span><br />


                </div>



                <button type="button" onClick={() => {
                    setShowAvatarChoices(true);
                    setShowPasswordInput(false);
                    }}>Change avatar</button>
                <button type="button" onClick={() => {
                    setShowPasswordInput(true);
                    setShowAvatarChoices(false);
                    }}>Change password</button>
                <div className={showAvatarChoices ? "avatar-container display" : "avatar-container hide"}>
                    <div className="note">Double click to confirm your choice
                    </div>
                    {/* <span className="note">double click to confirm your selection</span> */}
                    <img onClick={(e) => {
                        setRoute("../resources/wormy1.png");
                        setIsWormy1(true);
                        setIsWormy2(false);
                        setIsWormy3(false);
                        setIsWormy4(false);
                        setIsWormy5(false);
                        if (e.detail == 2) {
                            setPopupMessage("Avatar changed");
                            showConfirmation();
                            changeAvatar();
                            setShowAvatarChoices(false);
                        }


                    }} className="avatar" src={wormy1} alt="Bubble" />
                    <img onClick={(e) => {
                        setRoute("../resources/wormy2.png");
                        setIsWormy1(false);
                        setIsWormy2(true);
                        setIsWormy3(false);
                        setIsWormy4(false);
                        setIsWormy5(false);
                        if (e.detail == 2) {
                            setPopupMessage("Avatar changed");
                            showConfirmation();
                            changeAvatar();
                            setShowAvatarChoices(false);
                        }
                    }} className="avatar" src={wormy2} alt="Squashie" />
                    <img onClick={(e) => {
                        setRoute("../resources/wormy3.png");
                        setIsWormy1(false);
                        setIsWormy2(false);
                        setIsWormy3(true);
                        setIsWormy4(false);
                        setIsWormy5(false);
                        if (e.detail == 2) {
                            setPopupMessage("Avatar changed");
                            showConfirmation();
                            changeAvatar();
                            setShowAvatarChoices(false);
                        }
                    }} className="avatar" src={wormy3} alt="Loui" />
                    <img onClick={(e) => {
                        setRoute("../resources/wormy4.png");
                        setIsWormy1(false);
                        setIsWormy2(false);
                        setIsWormy3(false);
                        setIsWormy4(true);
                        setIsWormy5(false);
                        if (e.detail == 2) {
                            setPopupMessage("Avatar changed");
                            showConfirmation();
                            changeAvatar();
                            setShowAvatarChoices(false);
                        }
                    }} className="avatar" src={wormy4} alt="Momo" />
                    <img onClick={(e) => {
                        setRoute("../resources/wormy5.png");
                        setIsWormy1(false);
                        setIsWormy2(false);
                        setIsWormy3(false);
                        setIsWormy4(false);
                        setIsWormy5(true);
                        if (e.detail == 2) {
                            setPopupMessage("Avatar changed");
                            showConfirmation();
                            changeAvatar();
                            setShowAvatarChoices(false);
                        }
                    }} className="avatar" src={wormy5} alt="Wolow" />
                </div>

                <div className={showPasswordInput ? "display" : "hide"}>
                    <label>New password:<input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></label>
                    <button type="button" onClick={changePassword}>Change</button>
                </div>
                <button type="button" onClick={() => window.location.href = "https://raiz-cms-client.netlify.app"}>Log out</button>
                {isOpen && <Popup
                    content={<div className="popup-content">
                        <p><b>{popupMessage}</b></p>

                        <img className="success-image" src={tick} alt="successful deletion" />
                    </div>}
                    handleClose={showConfirmation}
                />}
            </div>
        
}
        export default Account;