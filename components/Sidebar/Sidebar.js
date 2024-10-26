// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';





const Sidebar = () => {
  
    return (
        <div className="sidebar">
      
      
      <div className="center">
        <ul>
          
        <Link to="/overview" style={{ textDecoration: "none" }}>
          <li>
            
            <span>OverView</span>
          </li>
          </Link>
          <Link to="/addcrime" style={{ textDecoration: "none" }}>
            <li>
              
              <span>Add Crime</span>
            </li>
            </Link>


          <Link to="/viewcrimes" style={{ textDecoration: "none" }}>
            <li>
              
              <span>View Crimes</span>
            </li>
          </Link>

          <Link to="/addcriminal" style={{ textDecoration: "none" }}>
          <li>
            
            <span>Add Criminal</span>
          </li>
          </Link>

          <Link to="/viewcriminals" style={{ textDecoration: "none" }}>
          <li>
         
            
            <span>View Criminal</span>
          </li>
          </Link>
          <Link to="/delete" style={{ textDecoration: "none" }}>
          <li>
           
            {/* <span>Delete</span>
          </li>
          </Link>
          <Link to="/criminal-details" style={{ textDecoration: "none" }}>
          <li> */}
           
            {/* <span>Criminal Details</span>
          </li>
          </Link>
          <Link to="/map" style={{ textDecoration: "none" }}>
          <li> */}

            <span>Map</span>
          </li>
          </Link>
          
          
        </ul>
      </div>
      
     
    </div>
    );
}

export default Sidebar;
