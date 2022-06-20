import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import HomeIcon from "../resources/home.png";
import "../App.css";

function LoginRegistration() {
    const [login, setLogin] = useState(true);
    return (
        <div>
        <Header page={"login and registration"} />
        <div className="login-and-registration-containeer">
            
            <div className="first-background">
                <div className="second-background">
                    
                    <div className="home-icon-container">
                        <a href=""><img src={HomeIcon} alt="home" /></a>
                    </div>
                    <div className="form-container">
                        <Registration isLogin={login} />
                        <Login isLogin={login} />

                    </div>
                    {/* <Login/>
            <Registration /> */}
                    <p class="login-registration-switch">{login ? "Don't have an account?" : "Already have an account?"} <span onClick={() => { setLogin(!login) }}>{login ? "Register here" : "Login here"}</span></p>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
        </div>
    );
}

export default LoginRegistration;