import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import "./sidebar.css"
import axios from "axios" 
import {SidebarData} from "./SidebarData"
import {IconContext} from "react-icons"
import { AiOutlineConsoleSql } from "react-icons/ai"


function Sidebar({history}){

   const [sidebar, setSidebar] = useState(false);
   const [username, setUsername] = useState("");
   //if its showing close else open 
   const toggleSidebar = () => setSidebar(!sidebar); 

   const logoutHandler = () =>{
    localStorage.removeItem("authToken");
} 

    // const getUsername = async () =>{
    //     const result = await axios.get("http://localhost:3002/auth/getusername");
    //     setUsername(result.data);
    // }


    useEffect(() => {
       //getUsername();
    }, []);


    return(
        <div className="sidebar-body">
          <IconContext.Provider value ={{color: "#fff"}}>
            <div className ="navbar">
                <Link to="#" className ="menu-bars hamburger">
                  <FaIcons.FaBars  onClick={toggleSidebar}/>
                </Link>
            <p className ="username">Welcome {username}</p>
            </div>
        <div>
            <nav className ={sidebar ? 'nav-menu active' : 'nav-menu'}>
               <ul className= "nav-menu-items" onClick={toggleSidebar}>
               <li className ="navbar-toggle">
               <Link to="#" className="menu-bars">
                   <AiIcons.AiOutlineClose className ="menu-bars x" />
               </Link>
               </li>
              
                   {SidebarData.map((item,index) =>{     // get each item from the Sidebar Data        
                       return (
                        <li key={index} className={item.cName}>
                           <Link  to={item.path}>
                               {item.icon}
                               <span>{item.title}</span>
                           </Link>
                       </li>
                       );
                       
                   })}
                   <Link to="/login">
                   <button className="navbar-logout" onClick ={logoutHandler} type = "submit">Logout</button>
                   </Link>
               </ul>
            </nav>
            
        </div>
        </IconContext.Provider>
        </div>
    )
}

export default Sidebar;