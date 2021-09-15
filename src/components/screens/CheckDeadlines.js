import React, {useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import Sidebar from './Tools/sidebar/Sidebar';
import CheckDeadlinesEachBook from './CheckDeadlinesEachBook';
import "./screenCSS/home.css"
import "./screenCSS/checkdeadlines.css"


const CheckDeadlines = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [booklist,setBooklist] = useState([]);
    const [borrowDate, setBorrowDate] = useState([]);    
    const [returnDate, setReturnDate] = useState([]);  
    const [overdueFine, setOverdueFine] = useState([Number]);
    const [bookDetails ,setBookDetails] = useState({
        book:[],
        borrow:[],
        returnd:[],
    })  

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
        getBorrowDate();
        getReturnDate();
    }, [history])


    const getBooksFromLocalBackend = async () =>{
        const result = await axios.get("http://localhost:3002/auth/getbooks");
        setBooklist(result.data);
        
    }
    const getBorrowDate = async () =>{
        const result = await axios.get("http://localhost:3002/auth/getborrowdate");
        setBorrowDate(result.data);
    }

    const getReturnDate = async () =>{
        const result = await axios.get("http://localhost:3002/auth/getreturndate");
        setReturnDate(result.data);
    }

    const getOverdue = async () =>{
        const result = await axios.get("http://localhost:3002/auth/getoverduefine");
        setOverdueFine(result.data);
    }

    bookDetails.book = booklist;
    bookDetails.borrow = borrowDate;
    bookDetails.returnd = returnDate;

   
    return (
        <div>
        <Sidebar />
        <p  className="go-to-checkout"><Link className ="go-to-checkout__text" to="/checkoutbooks">Checkout Books <strong className ="arrow">→</strong></Link></p>
           <h1 className="all-h1 deadlines">Check Deadlines</h1> 

        
        {bookDetails && bookDetails.book.map((item,index) =>{
        return(
            
            <CheckDeadlinesEachBook key={index} id = {item} index = {index} borrowDate ={bookDetails.borrow} returnDate = {bookDetails.returnd} overdueFine = {overdueFine}/>
        )

        })}
        


        
        </div>
    )
}

export default CheckDeadlines
