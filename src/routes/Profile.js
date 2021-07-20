import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import Calendardraw from "components/Calendar";
import Wavemaker from "components/Wave"
import Canvasdrawer from "components/Canvasdraw";
import App from "components/App";


const Profile = ({ userObj, refreshUser}) => {
  return (
    <div className = 'profile'>
    <Canvasdrawer userObj={userObj}/>
    </div>
  );
};
export default Profile;