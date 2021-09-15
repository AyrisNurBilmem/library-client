import React,{useEffect,useState} from 'react'
import axios from 'axios';

const PrivateScreen = ({history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        }

        const fetchPrivateData = async () =>{
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                //connect to the backend
                const {data} = await axios.get("/private", config);
                setPrivateData(data.data); //second data is the field of thr obh-ject check ==>(private/auth.js)
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized. Please login");
                
            }
        }
        fetchPrivateData();
    }, [history])

    //logout button
   
    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/login");
    } 
    return error ? (
        <span className ="error-message">
            {error}
        </span>
    ) :(
        <div>
            {privateData}
            <button onClick ={logoutHandler} type = "submit">Logout</button>
        </div>
        
        
    )
}

export default PrivateScreen
