import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName, onLogout }) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    onLogout(); // Call the logout handler passed from App.js
    navigate('/'); // Redirect to login or home page
  };

  return (
    <header className="header">
      <h1>Crime Information Management System</h1>
      <div className="user-info">
        <div className="profile" onClick={handleProfileClick}>
          {/* Display first letter of the user's name or police ID */}
          <span>{userName.charAt(0)}</span>
        </div>
        <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`}>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
