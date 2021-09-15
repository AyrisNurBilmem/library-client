import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./screenCSS/checkdeadlines.css"
import moment from "moment"
import CalculateOverdue from './CalculateOverdue'

const CheckDeadlinesEachBook = ({id,index,returnDate, borrowDate, overdueFine}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
        
    }, []);

    const fetchBooks = async () =>{
        const result = await axios.get( `${"https://www.googleapis.com/books/v1/volumes"}?q=${id}}`);
        setBooks(result.data.items[0].volumeInfo);
        
    }
    

    return (
        <div className = "grid-container deadlines">
       
             <img 
               className="img-class deadlines"
               alt="book-img"
               src={`http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
               />
        

       <div className ="text-div deadlines">
       <div className = "para-div">
           <p className ="para-div__text name">Name :</p>
           <p className ="para-div__text author">Author :</p>
           <p className ="para-div__text borrow" >Borrowing Date :</p>
           <p className ="para-div__text return" >Return Date :</p>
           <p className ="para-div__text fine" >Overdue Fine :</p>
       </div>
       <div className ="text-div__para">
       <p className ="book-text deadlines name">{books && books.title}</p>
       <p className = "book-text deadlines author">{books && books.authors}</p>
       <p className = "book-text deadlines norrow">{borrowDate[index]}</p>
       <p className = "book-text deadlines return">{returnDate[index]}</p>
       {(borrowDate[index] < moment().format('LL')) ? <p className = "book-text deadlines fine">"None" </p> : <CalculateOverdue overdueFine = {overdueFine}/>}
       
       </div>
       </div>
        </div>
    )


}

export default CheckDeadlinesEachBook
