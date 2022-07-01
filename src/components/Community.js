import React, { useState, useEffect } from "react";
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
import tick from "../resources/tick.png"

//The role of the current user is being passed but not used
function Community(props) {
    const [community, setCommunity] = useState([]);
    const [communityError, setCommunityError] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false);
    const [activeMember, setActiveMember] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [play] = useSound(success);

    useEffect(()=> {
    axios.get(`https://raiz-server2.herokuapp.com/user/`)
        .then(res => {
            //Is the fact that it keep re-rendering as shown by this console.log statement  a problem?
            setCommunity(res.data.filter(user => user.role !== "Pending..."));

            //You might need to resent community error but if it is reloaded you might not need to. What is best?
        })
        .catch(err => setCommunityError("There has been an error please try again or contact us"));
    }, [])
    function deleteMember(email) {
        axios.delete(`https://raiz-server2.herokuapp.com/user/${email}`)
            .then(res => {
                //console.log(res);
                //You might need to resent community error but if it is reloaded you might not need to. What is best?
            })
            .catch(err => setCommunityError("There has been an error deleting this request"))
    }

    function sendMessage(email){
        if (message.length > 0){
        axios.put(`https://raiz-server2.herokuapp.com/message`, {
            "messageObject": {
                "sendersName":`${props.firstName} ${props.lastName}`,
                "message":message,
                "from":props.email,
                "to":email,
                "date": new Date(),
                "read":false
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

        setMessage("");
        setMessageError("")
        setSendingMessage(false);
        showConfirmation();
        } else {
            setTimeout(()=>setMessageError("Empty message"), 5000);
            
        }
    }
    function showConfirmation(){
    setIsOpen(true);
            setTimeout(()=>console.log(setIsOpen(false)), 3000);
            play();
    }
    return (
        <div className={props.activeLink === "Community" ? "community-container display" : "community-container hide"}>
            <h3>Community Overview</h3>
            <span className={communityError.length > 0 ? "error-message display" : "error-message hide"}>{communityError}</span>
            <ul className="community-container-list">
                {community.map(member => {
                    let image = "";
                    if (member.avatar === "../resources/wormy1.png"){
                        image = wormy1;
                    } else if(member.avatar === "../resources/wormy2.png"){
                        image = wormy2;
                    } else if(member.avatar === "../resources/wormy3.png"){
                        image = wormy3;
                    } else if(member.avatar === "../resources/wormy4.png"){
                        image = wormy4;
                    } else {
                        image = wormy5
                    }
                
                    return (
                        <li>
                            <div><img className="avatar" src={image} alt=""/><h1>{member.firstName} {member.lastName}</h1><p>{member.role}</p>
                            <div className={sendingMessage && activeMember===member.email ? "display" : "hide"}>
                                <span className={messageError.length > 0 ? "error-message display" : "error-message hide"}>{messageError}</span><br/>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea><br/>
                            <button type="button" onClick={() => sendMessage(member.email)}>Send</button>
                            </div>
                            <button className="member-btn" type="button" onClick={(e) => {
                            e.preventDefault();
                            deleteMember(member.email);
                        }}>Delete</button><button onClick={()=>{
                            setActiveMember(member.email);
                            setSendingMessage(true);} }className="member-btn" type="button">Message</button></div>
                           
                        </li>
                    )
                })}
            </ul>
            {isOpen && <Popup
          content={<div className="popup-content">
            <p><b>Message sent!</b></p>
            
            <img className="success-image" src={tick} alt="successful deletion"/>
          </div>}
          handleClose={showConfirmation}
        />}
        </div>
    )
}

export default Community;