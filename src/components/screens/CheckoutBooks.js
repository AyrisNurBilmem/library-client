import React, {useState, useEffect } from 'react'
import axios from "axios"
import Sidebar from './Tools/sidebar/Sidebar';
import MakePrivate from '../makePrivate/MakePrivate';
import "./screenCSS/home.css"
import "./screenCSS/checkoutbooks.css"
import SearchArea from "./Tools/search/SearchArea"
import CheckoutEachBook from './CheckoutEachBook';


const CheckoutBooks = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [booklist, setBooklist] = useState([]);
    const [input, setInput] = useState("");
    const [checkoutbooks, setCheckoutbooks] = ([]);
   
  
    

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
        setBooklist(result.data);
    }
    
   
    return (
        <div>
        <MakePrivate />
        <Sidebar />
       
            <h1 className ="all-h1">Checkout Books</h1>
            {booklist && booklist.map((item,index) =>{
                return(
                    <CheckoutEachBook key={index} id ={item} />
                )
            })}
            
        </div>
    )
}

export default CheckoutBooks
