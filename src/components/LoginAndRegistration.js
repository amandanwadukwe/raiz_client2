import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import Header2 from "./Header2";
import Footer from "./Footer";

import "../App.css";

function LoginRegistration() {
    const [login, setLogin] = useState(true);
    return (
        <div>
        <Header2  />
        <div className="login-and-registration-containeer">
            
            <div className="first-background">
                <div className="second-background">
                    
                    
                    <div className="form-container">
                        <Registration isLogin={login} />
                        <Login isLogin={login} />

                    </div>
                    {/* <Login/>
            <Registration /> */}
                    <p className="login-registration-switch">{login ? "Don't have an account?" : "Already have an account?"} <span onClick={() => { setLogin(!login) }}>{login ? "Register here" : "Login here"}</span></p>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
        </div>
    );
}

export default LoginRegistration;