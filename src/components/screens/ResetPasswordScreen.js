import React,{useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import "./screenCSS/resetpassword.css"
import "./screenCSS/login.css"
import "./screenCSS/forgotpassword.css"
import girl from "./Tools/images/—Pngtree—hand drawn green world reading_5357246.png"
import * as BiIcons from "react-icons/bi" 

const ResetPasswordScreen = ({match}) => {

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
        headers: {
            "Content-Type" :"application/json"
        }
    }
    if(password !== confirmPassword){
        setPassword("");
        setconfirmPassword("");
        setTimeout(() =>{
            setError("")
        }, 5000);
        return setError("Passwords do not match");
    }

    try {
        const {data} = await axios.put(`/auth/resetpassword/${match.params.resetToken}`,{password},config);
        setSuccess(data.data);

    } catch (error) {
        setError(error.response.data.error);
        setTimeout(()=>{
            setError("")
        },5000);
    }
}

    return (
        <div className="start-con">
        <div className ="split right">
        <p className="back-to-login"><BiIcons.BiArrowBack className ="backicon"/><Link className ="back-to-login__text" to="/login">Back to login</Link></p>
        <form onSubmit={resetPasswordHandler} className ="start">
            <h3 className="welcome resetpassword">Reset Password</h3>
            {error && <span className="error-message">{error}</span>}
            {success && <span className = "success-message">{success}</span>}
            <p className="register-p resetpassword">
                    Please enter your new password. You can change your password as many times as you want
                </p>
           
            <div className="complete-div resetpassword">
            <div className="login-form resetpassword">
            
                <label className ="start-label" htmlFor="password">Password: </label>
                <input
                    className="start-input"
                    type="password"
                    id="password"
                    required
                    placeholder="Enter new password"
                    value ={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>

            <div className="login-form resetpassword">
                <label  className ="start-label resetlabelone" htmlFor="confirmPassword">Confirm P. : </label>
                <input
                    className="start-input"
                    type="password"
                    id="confirmPassword"
                    required
                    placeholder="Confirm new password"
                    value ={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                />

            </div>
            <div className="butondiv">
            <button type="submit" className="login-btn resetpassword">Reset Password</button>
            </div>
            </div>
        </form> 
        </div>
        <div className="split left">
            <div className="centered">
                <img className="girl" src ={girl} alt="girl"/>
            </div>
        </div>
        </div>
    )
}

export default ResetPasswordScreen
