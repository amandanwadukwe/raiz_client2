import {useState} from "react";
import Popup from "./Popup";

export default function Policies(){
    const [isOpen, setIsOpen] = useState(false);
    const [policyTitle, setPolicyTitle] = useState("");
    const [policyContent, setPolicyContent] = useState("");

    function showConfirmation() {
        setIsOpen(false);
        
    }

    return <div className="policies">
    <div>
        <h3>Confidentiality Policy</h3>
        <div>
            <button type="button" onClick={()=>{
                setPolicyTitle("Confidentiality Policy");
                setPolicyContent("<b>This is the confidentiality content</b>");
                setIsOpen(true);
            }}>View</button>
           
        </div>
    </div>
    <div>
        <h3>Safeguarding Policy</h3>
        <div>
            <button type="button" onClick={()=>{
                setPolicyTitle("Safeguarding Policy");
                setPolicyContent("<b>This is the safeguarding content</b>");
                setIsOpen(true);
            }}>View</button>


        </div>
    </div>
    {isOpen && <Popup
          content={<div className="popup-content">
            <b>{policyTitle}</b>
            <div dangerouslySetInnerHTML={{ __html: policyContent }}></div>
            <button type="button" onClick={showConfirmation}>Close</button>
            
        
          </div>}
          handleClose={showConfirmation}
        />}
</div> 
}