import React, {useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import Sidebar from './Tools/sidebar/Sidebar';
import MakePrivate from '../makePrivate/MakePrivate';
import "./screenCSS/home.css"
import "./screenCSS/viewbooks.css"
import ViewEachBook from "./ViewEachBooks"
import * as GrIcons from "react-icons/gr" 
import { IconContext } from 'react-icons/lib';

const ViewBooks = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [booklist, setBooklist] = useState([]);
    const [input, setInput] = useState("");

  
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
        getBooksFromLocalBackend(); 
         
    }, [history])

    const getBooksFromLocalBackend = async () =>{
        const result = await axios.get("http://localhost:3002/auth/getbooks");
        setBooklist(result.data)
        console.log("book: ", booklist);
        console.log("Get Books");
    }
        

    return (
        <div>
        <Sidebar />
        <p  className="go-to-checkout"><Link className ="go-to-checkout__text" to="/checkoutbooks">Checkout Books <strong className ="arrow">→</strong></Link></p>
            <h1 className="all-h1 yourbooks">Your Books</h1>


            {booklist && booklist.map((item,index) =>{
                return(
                    <ViewEachBook key={index} id = {item} />
                )
            })}
        </div>
    )
}

export default ViewBooks
