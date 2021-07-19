import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import Calendardraw from "components/Calendar";
import Wavemaker from "components/Wave"
import Canvasdrawer from "components/Canvasdraw";
import App from "components/App";

var userData = null;

const profile = ({ userObj, refreshUser}) => {
  console.log("PROFILE", userObj.uid);
  var docRef = dbService.collection("Users").doc(userObj.uid);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          userData = doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  return (
    <>            
      <Canvasdrawer/>
      <Calendardraw userData = {userData}> </Calendardraw>
    </>
  );
};
export default profile;

console.log("profile!!!!!!!!!!!!!!");

