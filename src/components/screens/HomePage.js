import React, {useState, useEffect } from 'react'
import axios from "axios"
import Sidebar from './Tools/sidebar/Sidebar';
import MakePrivate from '../makePrivate/MakePrivate';
import Books from './Tools/books/Books';
import "./screenCSS/home.css"


const HomePage = ({history}) => {
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
        <Sidebar />
            <h1 className="all-h1">Search Books</h1>
            <Books/>
        </div>
    )
}

export default HomePage