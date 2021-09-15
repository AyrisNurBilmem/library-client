import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./screenCSS/login.css"
import girl from "./Tools/images/—Pngtree—hand drawn cartoon reading day_5357253.png"
import "./screenCSS/login.css"

const LoginScreen = ({history}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

   useEffect(() =>{
       if(localStorage.getItem("authToken")){
           history.push("/home");
       }
   },[history]);
    

    const loginHandler = async (e) =>{
        e.preventDefault();

        //http connection
        const config = {
            headers :{
                "Content-Type":"application/json",
            }
        }

        try {
            const {data} = await axios.post( "/auth/login",{
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
        <div className = "start-con">
        <div className = "split right">
        <form className ="start" onSubmit ={loginHandler}> 
            <h1 className="welcome">Welcome</h1>
            {error && <span className="error-message">{error}</span>}
            <div className ="complete-form-div">
            <div className="login-form-div">
                <label className="start-label labelone" htmlFor="email">Email:</label>
                <input className="start-input" type ="email" required id="email" autoComplete="off" value={email} placeholder="Enter email" onChange = {(e) => setEmail(e.target.value)}/>
            </div>

            <div className="login-form-div">
                <label className="start-label" htmlFor="password">Password:</label>
                <input className="start-input" type ="password" required id="password" value={password} placeholder="Enter password" onChange = {(e) => setPassword(e.target.value)}/>
               
            </div>
            </div>
            <div className="butondiv">
            <button type="submit" className="login-btn">Login</button>
            </div>
            <p className="register-p">Do not have an account? </p>
            <Link to="/register" className = "register-link">Register Here</Link>
           
        </form>
        <Link to="/forgotpassword" className="login-screen__forgotpassword">Forgot Password?</Link>
        </div>
        <div className ="split left">
         <div className = "centered">
            <img className="girl" src ={girl} alt ="girl"/>
         </div>

        </div>
            
        </div>
    )
}

export default LoginScreen
