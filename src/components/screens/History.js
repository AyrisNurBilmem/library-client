import React, {useState, useEffect } from 'react'
import axios from "axios"
import Sidebar from './Tools/sidebar/Sidebar';
import MakePrivate from '../makePrivate/MakePrivate';
import "./screenCSS/home.css"
import HistoryBooks from './HistoryBooks';

const History = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [historyBooks, setHistoryBooks] = useState([]);

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
        getCheckedoutBooks();
    }, [history])

    const getCheckedoutBooks = async () => {
        const result = await axios.get("http://localhost:3002/auth/history");
        setHistoryBooks(result.data);
        
    }
    



    return (
        <div>
        
        <Sidebar />
            <h1 className ="all-h1">History</h1>
            {historyBooks && historyBooks.map((item,index) =>{
                return(
                    <HistoryBooks key={index} id ={item} />
                )
            })}
        </div>
    )
}

export default History
