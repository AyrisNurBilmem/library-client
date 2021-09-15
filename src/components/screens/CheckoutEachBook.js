import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./Tools/books/books.css"
import * as AiIcons from "react-icons/ai"
import Swal from "sweetalert2"

const CheckoutEachBook = ({id}) => {
    const [books, setBooks] = useState({});
    const [bookID, setBookID] = useState({});

    useEffect(() => {
        fetchBooks();
    },[]);

    const fetchBooks = async () =>{
        const result = await axios.get(`${"https://www.googleapis.com/books/v1/volumes"}?q=${id}}`);
        setBooks(result.data.items[0].volumeInfo);
        setBookID(result.data.items[0]);
        console.log(result.data.items[0]);
    }

    const submitHandler = (id)=>{
        window.location.reload();
        deleteBook(id);
    }

    const deleteBook = async (id) =>{
        await axios.post("http://localhost:3002/auth/checkoutbooks", {book:id})
        
    }


    return (
        <div className = "grid-container">
        
             <img 
                    className="img-class ad"
                    alt="book-img"
                    src={`http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                    />
        <button type ="submit" className ="checkoutbook" onClick ={() => submitHandler(id)}><AiIcons.AiOutlineDelete/></button>
            <div className ="text-div">
            <p className ="book-text">{books && books.title}</p>
            <p className = "book-text author">{books && books.authors}</p>
            </div>
        </div>
    )
}

export default CheckoutEachBook
