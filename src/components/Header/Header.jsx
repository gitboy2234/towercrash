import React,{useState} from "react";
import {Link} from "react-router-dom"
import './Header.css';


function Header(props) {

  
    
    return (
        <div className=" z-0" >
        <nav>
            <ul className="  lg:flex ">
            <li className=" mx-10 my-7 nav-li cursor-pointer"><Link to = "/">Home</Link></li>
                <li className=" mx-10 my-7 nav-li cursor-pointer"><Link to = "/statistics">Statistics</Link></li>
                <li className=" mx-10 my-7 nav-li cursor-pointer"><Link to = "/about">About</Link></li>
          
            </ul>
            </nav>
        </div>

    )
}


export default Header;