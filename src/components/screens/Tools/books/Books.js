import React, { useEffect, useState } from "react"
import SearchArea from "../search/SearchArea"
import axios from "axios"
import Booklist from "./Booklist"
import "./books.css"
import NotFound from "./NotFound"

function Books({}){
   const [books, setBook]=useState({
       items:[]
   });

   const [input, setInput] = useState("");
   

  const handleInput = (event) =>{
        setInput(event.target.value);
  }

   const fetchBooks = async ()=>{
       const result = await axios.get(
        `${"https://www.googleapis.com/books/v1/volumes"}?q=${input}&maxResults=40`
       ).then(result =>{
        setBook(result.data);
        
       })
       .catch(Error => {
        setBook(undefined);
       });
   }
 
   
   console.log("Books : ", books);
   const submitHandler =(event)=>{
       event.preventDefault();
       fetchBooks();
   }
    

    return(
        <div className ="background">
            <SearchArea submitHandler = {submitHandler} handleInput={handleInput} input={input}/>
           {books == undefined ? <NotFound /> : <Booklist books = {books.items} />}
           
        </div>
    )
}

export default Books;