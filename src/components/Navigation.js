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
      <li><Link to="/" className = "menuLink">시작</Link></li>
      <li><Link to="/profile" className = "menuLink">{userObj.displayName}의 일기들</Link></li>
      <li><Link to ="/total" className = "menuLink">책장</Link></li>
      <button onClick={onLogoutClick} className = "LogOut">나가기</button>
    </ul>
  </nav> 
  </div> 
);

export default Navigation;