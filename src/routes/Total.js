import React from "react";
import { dbService, authService, firebaseInstance } from "fbase";
import '../index';
import Slider from "components/Slider";

var userData = null;

const Total = ({ userObj }) => {
  return (
    <>
    <Slider userObj = {userObj}></Slider>
    </>
  );
};

export default Total;
