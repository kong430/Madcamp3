import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import Calendardraw from "components/Calendar";
import App from "components/App";

export default ({ userObj, refreshUser, userData}) => {
  console.log("PROFILE", userData);
  return (
    <>
      <Calendardraw> </Calendardraw>
    </>
  );
};

console.log("profile!!!!!!!!!!!!!!");
/**console.log(authService.currentUser.uid);
var docRef = dbService.collection("Users").doc("jBazOsXyA7QZ3GDYaB0zPWzPBOz2");

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});*/
