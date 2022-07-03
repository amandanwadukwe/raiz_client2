import { useState, useEffect } from "react";
import axios from "axios";

export default function Forum(props){
    const [allMessageObjects, setAllMessageObjects] = useState([]);
    const [message, setMessage] = useState("");
    const [recipientMessageId, setRecipientMessageId] = useState("Everyone");
    const [messageSent, setMessageSent] = useState(false);
    const [repliedMessageObject, setRepliedMessageObject] = useState({});

    useEffect(()=>{
        axios.get("https://raiz-server2.herokuapp.com/forum")
    .then(res => setAllMessageObjects(res.data))
    .catch(err => console.log(err))
    
    }, [messageSent])
    


    function sendMessage(){
        //  console.log(message)

        axios.post("https://raiz-server2.herokuapp.com/forum",{
            sender:`${props.firstName} ${props.lastName}`,
            sendersEmail:props.email,
            recipientMessageId:recipientMessageId,
            date:new Date(),
            message:message,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        setMessage("");
        setMessageSent(!messageSent);
    }
    console.log("allMessageObjects", allMessageObjects)
    
    return<div className ={props.activeLink === "Forum" ? "forum-container display" : "forum-container hide"}>
        
        <h1>Forum</h1>
        {/* it might be best to put the submit handler in the form tag everywhere */}
        <div>
            {allMessageObjects.map(messageObject => {
               
                if (recipientMessageId !== "Everyone"){
                    setRepliedMessageObject( allMessageObjects.filter(message => message._id === String(recipientMessageId)))
                }
                // console.log("repliedMessageObject", repliedMessageObject)
                return <div onCliick={()=>setRecipientMessageId(messageObject._id)}>
                    <div><h5>{repliedMessageObject.sender}</h5><h5>{repliedMessageObject.message}</h5></div>
                    <h3>{messageObject.sender}</h3>
                    <p>{messageObject.message}</p>
                    <span>{messageObject.date}</span>
                </div>
            })}
        </div>
        <form>

            <label>Type in your message:<input value={message} onChange={(e) => setMessage(e.target.value)}/></label>

                {/* You might need to use submit for this button and some other buttons */}
            <button type="button" onClick={()=>sendMessage()}>Send message</button>
        </form>
    </div>
}