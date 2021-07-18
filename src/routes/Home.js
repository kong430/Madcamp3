import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import "../index"

const Home = ({ userObj }) => {
  
  return (
  <div className = "home">
  <h1 className = "question"> 오늘 하루는 어땠나요?</h1>
  <textarea className = "textbox"></textarea>
    <div className = "submitDiv">
    <button className = "submit">완  료</button>
    </div>
  </div>
  )
};

console.log("Home!!!!!!!!!!!!!");

export default Home;
