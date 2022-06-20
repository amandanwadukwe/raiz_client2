import { useState } from "react";
import Popup from "./Popup";
import close from "../resources/close.png";

export default function Help() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function showConfirmation() {
        setIsOpen(false);
        
    }

    return <div>
        <div className="help" onClick={()=> setIsOpen(true)}>?</div>
        {isOpen && <Popup
          content={<div className="popup-content">
            <button type="button" style={{}} onClick={showConfirmation}><img src={close} alt="close popup"/></button>
            <h3>07731 552259</h3>
            <b>Our helpline is open Monday - Thursday, 10.00 - 12.00. Assylum seekers, refugees and volunteers are welcome to call us if you think we may be able to help.</b>
            <form>
            <label>Name:<br/><input type="email" onChange={(e)=>setName(e.target.value)} value={name} required/></label><br/>
            <label>Email:<br/><input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/></label><br/>
            <label>Message: <textarea className="create-notice-message" onChange={(e) => setMessage(e.target.value)} value={message}></textarea></label><br />



            </form>

            
            
        
          </div>}
          handleClose={showConfirmation}
        />}
        </div>
}