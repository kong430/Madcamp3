import React from "react";
import { Link } from "react-router-dom";
import '../index'
import Profile from "routes/Profile";

const Navigation = ({ userObj }) => (
  <div class = "wrapper">
  <nav className = "nav">
    <ul className = "menu">
      <li><Link to="/" class = "menuLink">Home</Link></li>
      <li><Link to="/profile" class = "menuLink">{userObj.displayName} 's Profile</Link></li>
    </ul>
  </nav> 
  </div> 
);

export default Navigation;