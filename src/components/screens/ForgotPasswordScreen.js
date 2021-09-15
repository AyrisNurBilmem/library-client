import React, {useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import "./screenCSS/forgotpassword.css"
import "./screenCSS/login.css"
import girl from "./Tools/images/—Pngtree—hand drawn world book day_5357259.png"
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi" 

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        try {
            //connect backend
            const {data} = await axios.post("/auth/forgotpassword",{email},config);

            setSuccess(data.data);


        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(()=>{
                setError("")
            }, 5000);
        }
    }


    return (
        <div className="start-con">
        
        <div className ="split right">
        <p className="back-to-login"><BiIcons.BiArrowBack className ="backicon"/><Link className ="back-to-login__text" to="/login">Back to login</Link></p>
        <form onSubmit={forgotPasswordHandler} className ="start forgotpassword">
           
            <h3 className="welcome forgotpassword">Forgot Password</h3>
            {error && <span className="error-message">{error}</span>}
            {success && <span className = "success-message">{success}<BsIcons.BsCheck className="checkicon"/></span>}

            <div className="complete-div forgorpassword">
            <div className="login-form-div">
                <p className="register-p resetpassword">
                    Please enter your registered email. We will send a reset password confirmation link to that email
                </p>
                <label className = "start-label" htmlFor="email">Email: </label>
                <input
                    className = "start-input"
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                    placeholder="Enter your email"
                    value ={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>
            </div>
            <div className ="butondiv forgotpassword">
            <button type="submit" className="login-btn forgotpassword">Send Email</button>
            </div>
        </form>
        
            
        </div>
        <div className ="split left">
            <div className = "centered">
                <img className ="girl" src ={girl} alt ="girl"/>
            </div>
        </div>


        </div>
    )
}

export default ForgotPasswordScreen

