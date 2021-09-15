import React, { useState } from 'react'
import * as AiIcons from "react-icons/ai"
import "./books.css"

function NotFound() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () =>{
        setClicked(true);
    }
    return (
        <div>
            <p className = "notfound-p">No Book Found</p>
            <button onClick = {handleClick} className = {clicked === true ? "request-book": "notfound-btn"} >
            {clicked === true ? "Requested  "  : "Request Book"}
            {clicked === true ? <AiIcons.AiOutlineCheck className="icon"/> : null}

            </button>
        </div>
    )
}

export default NotFound
