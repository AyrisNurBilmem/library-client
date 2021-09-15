import React from 'react'
import notfound from "../screens/Tools/images/404_img.png"
import "./screenCSS/fourofour.css"
import {Link} from "react-router-dom"

const FourOFourPage = () => {
    return (
        <div>
        <img className = "notfound-img" src={notfound} alt="not-found"/>
        <h3>The page you are looking for does not exist</h3>
        <p className ="notfound-p">Please click the button below to go to home</p>
        <Link className = "notfound-link" to="/home">
        <button className="notfound-button">Home</button>
        </Link>
        
        </div>
    )
}

export default FourOFourPage
