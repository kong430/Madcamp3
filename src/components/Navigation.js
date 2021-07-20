import React from "react";
import { Link } from "react-router-dom";
import '../index'
import Profile from "routes/Profile";
import { authService, dbService } from "fbase";


const onLogoutClick = () => {
  authService.signOut();
};

const Navigation = ({ userObj }) => (
  <div className = "wrapper">
  <nav className = "nav">
    <ul className = "menu">
      <li><Link to="/" className = "menuLink">Home</Link></li>
      <li><Link to="/profile" className = "menuLink">{userObj.displayName}의 일기들</Link></li>
      <li><Link to ="/total" className = "menuLink">All</Link></li>
      <button onClick={onLogoutClick} className = "LogOut">Log Out</button>
    </ul>
  </nav> 
  </div> 
);

export default Navigation;