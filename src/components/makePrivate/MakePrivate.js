import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"
import axios from "axios"

const MakePrivate = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(()=>{
        
        if(!localStorage.getItem("authToken")){
            history.push("/login")
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

    return (
        <div>
            
        </div>
    )
}

export default MakePrivate
