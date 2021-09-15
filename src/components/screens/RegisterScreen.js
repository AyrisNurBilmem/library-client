import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./screenCSS/login.css"
import "./screenCSS/register.css"
import boy from"./Tools/images/—Pngtree—hand drawn cartoon reading day_5357258.png"

const RegisterScreen = ({history}) => {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    useEffect(() =>{
        if(localStorage.getItem("authToken")){
            history.push("/home");
        }
    },[history]); 

    const registerHandler = async (e) =>{
        e.preventDefault();

        //http connection
        const config = {
            header :{
                "Content-Type":"application/json",
            }
        }

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(()=>{
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const {data} = await axios.post( "/auth/register",{
                username,
                email,
                password
            },config);

            localStorage.setItem("authToken",data.token);

            history.push("/home");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return (
        <div className="start-con">
        <div className="split right">
        <form className ="start" onSubmit ={registerHandler}> 
            <h1 className="welcome register">Register</h1>
            {error && <span className="error-message">{error}</span>}
            <div className="complete-form-div register">
            <div className="login-form-div">
                <label className = "start-label labelOne" htmlFor="username">Username: </label>
                <input className = "start-input" type ="text" required id="username" value={username} placeholder="Enter username" onChange = {(e) => setUsername(e.target.value)}/>
            </div>

            <div className="login-form-div">
                <label className = "start-label labeltwo" htmlFor="email">Email: </label>
                <input className = "start-input" type ="email" required id="email" value={email} placeholder="Enter email" onChange = {(e) => setEmail(e.target.value)}/>
            </div>

            <div className="login-form-div">
                <label className = "start-label labelthree" htmlFor="password">Password: </label>
                <input className = "start-input" type ="password" required id="password" value={password} placeholder="Enter password" onChange = {(e) => setPassword(e.target.value)}/>
            </div>

            <div className="login-form-div">
                <label className = "start-label" htmlFor="confirmPassword">Confirm P. : </label>
                <input className = "start-input" type ="password" required id="confirmPassword" value={confirmPassword} placeholder="Confirm password" onChange = {(e) => setConfirmPassword(e.target.value)}/>
            </div>

            <div className="login-form-div">
                <label className = "start-label labelfour" htmlFor="address">Address: </label>
                <input className = "start-input" type ="text" required id="address" value={address} placeholder="Enter address" onChange = {(e) => setAddress(e.target.value)}/>
            </div> 
            </div>
            <div className = "butondiv">
            <button type="submit" className="login-btn">Register</button>
             </div> 
            <span className="register-p">Already have an account? </span>
            <Link to="/login" className="register-link">Login</Link>
        </form>
        </div>
        <div className="split left">
            <div className="centered">
                <img className="girl" src = {boy} alt="boy"/>
            </div>

        </div>
        </div>
    )
}

export default RegisterScreen
