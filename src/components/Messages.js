import React, { useState, useEffect  } from "react";
import axios from "axios";
import backBtn from "../resources/backArrow_black.png"
import "../App.css";
import wormy1 from "../resources/wormy1.png";

function Messages(props){
    const [activeRecipients, setActiveRecipients] = useState([]);
    const [activeRecipient, setActiveRecipient] = useState("");
    const [activeRecipientEmail, setActiveRecipientEmail] = useState("");
    const [allMessageObjects, setAllMessageObjects] = useState([{"from":"rachel@gmail.com", "message":"hello", "to":"amanda@gmail.com", "read":false,"date":"","sendersName":"Hello Hi"}]);
    const [messageToBeSent, setMessageToBeSent] = useState("");


    axios.get(`https://raiz-server2.herokuapp.com/user/${props.email}`)
    .then(res => {
        let recipients = [];
        res.data[0].messages.map(message => recipients.push(message.sendersName));
        setActiveRecipients(Array.from(new Set(recipients)));
        setAllMessageObjects(res.data[0].messages);
    })
    .catch(err => console.log(err))



    axios.get(`https://raiz-server2.herokuapp.com/user`)
    .then(res => {
        res.data.map(user => {
            if (`${user.firstName} ${user.lastName}` === activeRecipient){
                setActiveRecipientEmail(user.email);
            }
        })
    })
    .catch(err => console.log(err))

    function sendMessage(){
        axios.put(`https://raiz-server2.herokuapp.com/message`, {
            "messageObject": {
                "sendersName":`${props.firstName} ${props.lastName}`,
                "message":messageToBeSent,
                "from":props.email,
                "to":activeRecipientEmail,
                "date": new Date(),
                "read":false
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        setMessageToBeSent("");
    }

    function readMessages(){
        axios.put(`https://raiz-server2.herokuapp.com/view_message`, {
            "email": props.email,
            "sendersEmail": activeRecipientEmail        
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    

    return <div className={props.activeLink === "Messages" ? "messages-container display" : "messages-container hide"}>
        {activeRecipients.map(recipient => {
            let unreadMessage = false;
           if(recipient !== `${props.firstName} ${props.lastName}`)
           return  <div>
               <div className={activeRecipient === recipient ? "display" : "hide"}>
                   <div className="chat-header">
                       <img src={backBtn} onClick={()=> setActiveRecipient("")} className="back-btn" alt="Go back"/>
                       <h6>This is your chat with <u>{activeRecipient}</u></h6>
                   </div>
                <div  className="message">
                    
                    {allMessageObjects.map(messageObject => {
                        
                        if(messageObject.sendersName === recipient){
        
                           return <div className="message-to-me">{messageObject.message}</div>
                        } 
                    })}
                    <div className="messages-from-me-container">
                    {allMessageObjects.map(messageObject => {
                        
                        if(messageObject.from === props.email && messageObject.to === activeRecipientEmail ){
                            return <div className="message-from-me">{messageObject.message}</div>
                        }
                    })}
                    </div>
                </div>
                <div className="new-message-form">
                    <form>
                        {/* might need to change this to use a textarea */}
                        <input type="text" value={messageToBeSent} onChange={(e)=>setMessageToBeSent(e.target.value)} />
                        <button type="button" onClick={sendMessage}>Send</button>
                    </form>
                </div>
                </div>
                {/* className={messageView ? "display" : "hide"} */}
                <div className={activeRecipient.length === 0 ? "message-heading display" : "message-heading hide"} onClick={() => {
                    setActiveRecipient(recipient);
                    readMessages();
                }}>
                    <img className="avatar-in-message avatar" src={wormy1} alt=""/>
                <h1  className={unreadMessage ? "unread-message": ""}  >{recipient}<span> {unreadMessage ? "unread message": ""}</span></h1>
               
               </div>
            </div>
        })}
    </div>
}

export default Messages;