import React, { useState } from "react";
import backImage from "../resources/backArrow_black.png";
import axios from "axios";
// import '../styles.css';

const date = new Date();
function Registration(props) {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [secretErrorMsg, setSecretErrorMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [secretRequired, setSecretRequired] = useState(false);

    //This function is triggered when the submit button for the registration form is clicked
    function handleRegisterSubmit(e) {
        if(firstName.length === 0 || lastName.length === 0 || role.length === 0 || email.length === 0 || password.length === 0){
            setErrMsg("Please fill all feilds")
        } else {
        e.preventDefault();
        if (confirmPassword === password) {
            console.log("Passwords match");
            axios.get(`https://raiz-server2.herokuapp.com/user/${email}`)
            .then(res => {
                if (res.data.length == 0) {
                    //Remember to not go forward if the role is empty
                    if (role === "Admin") {
                        setSecretRequired(true);
                    } else if (role === "Volunteer") {
                        setSecretRequired(true);
                        axios.post("https://raiz-server2.herokuapp.com/request_success", {
                            "email": email
                        })
                            .then(res => {
                                setSecretErrorMsg("You have been sent an email with the secret")
                                console.log(res)
                            })
                            .catch(err => console.log(err))
                    };
                } else {
                    setErrMsg("This email has already been used")
                }
            })
            .catch(err => console.log(err));
        } else {
            setErrMsg("Passwords do not match");
        }
    }
        
    }

    //This function will make the registration visible again and clos the secret field when the back button is clicked
    function backToRegistrationForm() {
        setSecretRequired(false);
    }

    //This function handles Admin registration after the secret is entered
    function handleRegister(e) {
       
        e.preventDefault();
        //Is this supposed to be a get or a post, woman?
        if (role === "Admin") {
            axios("https://raiz-server2.herokuapp.com/secret")
                .then((response) => {
                    if (secret === response.data[0].secret) {
                        axios
                            .post("https://raiz-server2.herokuapp.com/user", {
                                "firstName": "" + firstName + "",
                                "lastName": lastName,
                                "role": role,
                                "email": email,
                                "password": password,
                                "confirmPassword": confirmPassword,
                                "date": "" + date + ""
                            })
                            .then(res => {
                                console.log(res);
                                window.location.href = `http://localhost:3000/home/${email}`
                            })
                            .catch(err => {
                                console.log(err);
                                setSecretErrorMsg("Wrong password");
                            });
                    } else { setSecretErrorMsg("Secret incorrect") };

                })
                .catch(err => console.log(err));
        } else if (role === "Volunteer") {
            axios("https://raiz-server2.herokuapp.com/secret")
                .then((response) => {
                    if (secret === response.data[1].secret) {
                        axios
                            .post("https://raiz-server2.herokuapp.com/user", {
                                "firstName": "" + firstName + "",
                                "lastName": lastName,
                                "role": "Pending...",
                                "email": email,
                                "password": password,
                                "confirmPassword": confirmPassword,
                                "date": "" + date + ""
                            })
                            .then(res => {
                                console.log(res);
                                
                                window.location.href = "http://localhost:3000/volunteer"
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else { setSecretErrorMsg("Secret incorrect") };

                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className={ props.isLogin ? "registration-form hide" : "registration-form display"}>
            <div className={secretRequired ? "hide" : "display"}>
                <h1>Register</h1>
                <span className={errMsg.length > 0 ? "error-message display" : "error-message hide"}>{errMsg}</span>
                <form>
                    <label>First name:<br/> <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} maxLength={20} required /></label><br />
                    <label>Last name:<br/> <input type="text" maxLength={20} onChange={(e) => setLastName(e.target.value)} value={lastName} required /></label><br />
                    <label>Role:<br/>
                        <select onChange={(e) => setRole(e.target.value)} value={role}>
                            <option></option>
                            <option>Admin</option>
                            <option>Volunteer</option>
                        </select>
                    </label><br />
                    <label>Email:<br/> <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required /></label><br />
                    <label>Password:<br/> <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required /></label><br />
                    <label>Confirm password:<br/> <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required /></label><br />
                    <label>Date:<br/> <input type="text" readOnly={true} value={date} required /></label><br />
                    <button onClick={handleRegisterSubmit} type="submit">Submit</button>
                </form>
            </div>
            <div className={secretRequired ? "display" : "hide"}>
                <div className="secret-header">
                <img src={backImage} onClick={backToRegistrationForm} alt="go back to registrationform" /><span>Go back to registration form</span>
                </div>
                <span className={secretErrorMsg.length > 0 ? "error-message display" : "error-message hide"}>{secretErrorMsg}</span>
                <form>
                    <label>Secret:<input type="password" onChange={(e) => setSecret(e.target.value)} value={secret} required /></label>
                    <button onClick={handleRegister} type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;