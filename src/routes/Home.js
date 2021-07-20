import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import "../index"
import Inputtextfield from "components/Inputtextarea";
import Slider from "components/Slider";

const Home = ({ userObj }) => {
  
  return (
  <div className = "home">
  <h1 className = "question"> 오늘 하루는 어땠나요?</h1>
  <Inputtextfield/>
  </div>
  )
};

export default Home;
