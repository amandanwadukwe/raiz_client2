import React, { useState } from "react";
import logo from "../resources/raiz_logo.png";
import HomeIcon from "../resources/home.png";


function Header2(props){
  

   
   return  <header>
       <a href="" target="_blank">"<img className="logo" src={logo} alt="raiz logo"/></a>
                        <a target="_blank" href="http://rais.org.uk/"><img src={HomeIcon} alt="home" /></a>
           
       {/* <img onClick={()=> props.goToAccount()} className={props.page === "home" ?"icon avatar display": "icon account-icon hide" } src={image} alt="Your account" />
       <img className="icon menu-icon" src={menu} onClick={props.toggleNavBar} alt="Menu"/> */}
    </header>
}

export default Header2;