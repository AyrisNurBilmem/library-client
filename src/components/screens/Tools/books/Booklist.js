import React from "react"
import {Link} from "react-router-dom";
import NotFound from "./NotFound";


function Booklist({books}){
    return(
        <div>
            {   books ?
                (books && books.map((item,index) =>{
                  
                   return(
                       
                 <div key={index} className = "grid-container">
                   <div >
                   <Link to ={`/home/${item.id}`}>
                    <img 
                    className="img-class"
                    alt={`${item.volumeInfo.title}`}
                    src={`http://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                    />
                   </Link>
                   <div className = "text-div">
                  <h3 className= "book-text" >{item.volumeInfo.title}</h3>
                  <p className= "book-text author"> <strong>{(item.volumeInfo.authors != null) ? item.volumeInfo.authors: "No Author for This Book"}</strong></p>
                </div>
              </div>
              
            </div> )
            }) ) 
            : <NotFound />
            }
        </div>
    )
}

export default Booklist;