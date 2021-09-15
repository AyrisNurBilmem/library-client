import React, {useState} from "react"
import "../books/books.css"
import "./searchArea.css"
import * as FiIcons from "react-icons/fi"
import { IconContext } from "react-icons/lib";
import girl from "../images/—Pngtree—hand drawn cartoon world reading_5357260.png"

function SearchArea(props){
   const [buttonPress, setButtonPress] = useState(false);

   const handleButtonPress = () =>{
       setButtonPress(true);
   }

    return(
        
        <div className = "search-div">
          <form onSubmit = {props.submitHandler}>
              <input className= "search-box" type= "search" placeholder ="book title, author, etc.." onChange={props.handleInput} value= {props.input}></input>
              <button className = "search-button" type="submit" onClick = {handleButtonPress}><FiIcons.FiSearch size="21px" /></button>
          </form>
          {buttonPress === false && (<div>
                <img className = "img-class__search" src = {girl} alt = "girl"/>
                <p className ="img-class__text">Search any book you want!</p>
            </div>) }
          

        </div>
    )
}

export default SearchArea;