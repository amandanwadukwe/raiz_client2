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
                setPolicyContent("<strong>RAIS Lancaster confidentiality policy and agreement. </strong><strong>Policy Statement</strong><p>Confidentiality is central to our work supporting asylum seekers and refugees. It is essential that all those using RAIS’s services have absolute confidence in our confidentiality arrangements. Confidentiality is central to our work supporting asylum seekers and refugees. It is essential that all those using RAIS’s services have absolute confidence in our confidentiality arrangements. We always respect our clients’ privacy and regard any information they give us as strictly given in confidence unless we have their explicit, written permission to share details with other appropriate individuals or organisations. </p><p>Through induction, training and ongoing coaching we ensure that all trustees, staff and volunteers involved in delivering our services understand these principles and are committed to protecting them. Any breach of confidentiality is treated extremely seriously.</p><p>We require all trustees, staff and volunteers associated with RAIS to sign and adhere to our Confidentiality Agreement (see below) before commencing any role within the organisation.</p><p>We also comply with the Home Office requirements for confidentiality in respect of asylum seekers who are regarded as vulnerable adults. We apply the same level of confidentiality to our work with refugees.</p><p>Confidentiality extends to information about volunteers, trustees and staff; and to sensitive information about the Charity itself.</p><p>This policy should be read in conjunction with our Safeguarding Policy and our Data Protection Policy.</p>");
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