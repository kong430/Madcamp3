import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import "../index"
import Inputtextfield from "components/Inputtextarea";
import Slider from "components/Slider";

const Home = ({ userObj }) => {
  
  return (
    
  <div className = "home">
    <Slider/>
  </div>
  )
};

export default Home;
