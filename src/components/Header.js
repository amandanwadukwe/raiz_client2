import React, { useState } from "react";
import logo from "../resources/raiz_logo.png";
import account from "../resources/account.png";
import menu from "../resources/hamburger.png";
import axios from "axios";
import wormy1 from "../resources/wormy1.png";
import wormy2 from "../resources/wormy2.png";
import wormy3 from "../resources/wormy3.png";
import wormy4 from "../resources/wormy4.png";
import wormy5 from "../resources/wormy5.png";

function Header(props){
    const [avatar, setAvatar] = useState("");

    let image = "";
    if (avatar === "../resources/wormy1.png"){
        image = wormy1;
    } else if(avatar === "../resources/wormy2.png"){
        image = wormy2;
    } else if(avatar === "../resources/wormy3.png"){
        image = wormy3;
    } else if(avatar === "../resources/wormy4.png"){
        image = wormy4;
    } else {
        image = wormy5
    }

    axios.get(`http://localhost:5000/user/${props.email}`)
    .then(res => {
        console.log(res.data)
        setAvatar(res.data[0].avatar)
       
    })
    .catch(err => console.log(err));

   
   return  <header>
       <a href="" target="_blank"><img className="logo" src={logo} alt="raiz logo"/></a>
       <img onClick={()=> props.goToAccount()} className={props.page === "home" ?"icon avatar display": "icon account-icon hide" } src={image} alt="Your account" />
       <img className="icon menu-icon" src={menu} onClick={props.toggleNavBar} alt="Menu"/>
    </header>
}

export default Header;