import {useEffect, useState} from "react";
import Popup from "./Popup";
import axios from "axios";

export default function Policies(){
    
    const [confidentialityPolicy, setConfidentialityPolicy] = useState("");
    const [safeguardingPolicy, setSafeguardingPolicy] = useState("");
    const [activePolicy, setActivePolicy] = useState("");
    const [showPolicy, setShowPolicy] = useState(false);
    const [showClosePolicyBtn, setShowClosePolicyBtn] = useState(false);


    useEffect(()=> {
        axios.get(`https://raiz-server2.herokuapp.com/content`)
        .then(res => {
            setConfidentialityPolicy(res.data.filter(datum => datum.title === "Confidentiality Policy")[0]);
        })
        .catch(err => console.log(err));
    }, [])

    useEffect(()=> {
        axios.get(`https://raiz-server2.herokuapp.com/content`)
        .then(res => {
            setSafeguardingPolicy(res.data.filter(datum => datum.title === "Safeguarding Policy")[0]);
        })
        .catch(err => console.log(err));
    }, [])
             
    
    

    return <div className="policies-container">
        <div    className= "policies">
    <div>
        <h3>Confidentiality Policy</h3>
        <div>
            <button type="button" onClick={()=>{
                setActivePolicy("confidentiality");
                setShowPolicy(true);
                setShowClosePolicyBtn(true);
            }}>View</button>
           
        </div>
    </div>
    <div>
        <h3>Safeguarding Policy</h3>
        <div>
            <button type="button" onClick={()=>{
                setActivePolicy("safeguarding");
                setShowPolicy(true);
                setShowClosePolicyBtn(true);
            }}>View</button>


        </div>
    </div>
    </div>
    <div className={showPolicy ? "display" : "hide"} dangerouslySetInnerHTML={{ __html: activePolicy=== "confidentiality" ? confidentialityPolicy.html : safeguardingPolicy.html }}></div>
    <button type="button" className={showClosePolicyBtn ? "display" : "hide"} onClick={()=> {
        setShowPolicy(false);
        setShowClosePolicyBtn(false);
    }}>Close</button>
 
</div> 
}