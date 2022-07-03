import React, { useState } from "react";
import axios from "axios";
// import '../App.css';

function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleLogin(e){
        if(email.length === 0){
            setErrorMessage("No email provided")
        }else if(password.length === 0){
            setErrorMessage("Password feild is empty")
        } else {
        e.preventDefault();

        axios.post(`https://raiz-server2.herokuapp.com/user/${email}`, {
            "email": email,
            "password": password
        })
        .then(res => {
           console.log(res)
            
            window.location.href = `https://raiz-cms-client.netlify.app/home/${email}`
        })
        .catch(err => {
                setErrorMessage("This account does not exist")});
    }
        
    }

    return(
        <div className={props.isLogin ? "login-form display" : "login-form hide"}>
            <h1>Login</h1>
            <span className={errorMessage.length > 0 ? "error-message display" : "error-message hide"}>{errorMessage}</span>
            <form>
                <label>Email:<br/><input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/></label><br/>
                <label>Password:<br/><input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/></label><br/>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login;