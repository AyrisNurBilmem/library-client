import React, {useState, useEffect} from 'react'
import axios from "axios"

const ViewEachBooks = ({id}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () =>{
        const result = await axios.get( `${"https://www.googleapis.com/books/v1/volumes"}?q=${id}}`);
        setBooks(result.data.items[0].volumeInfo);
    }
    return (
        <div className = "grid-container">
        <img 
               className="img-class"
               alt="book-img"
               src={`http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
               />
       <div className ="text-div">
       <p className ="book-text">{books && books.title}</p>
       <p className = "book-text author">{books && books.authors}</p>
       </div>
   </div>
    )
}

export default ViewEachBooks
