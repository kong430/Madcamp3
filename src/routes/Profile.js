import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import Calendardraw from "components/Calendar";
import Wavemaker from "components/Wave"

export default ({ userObj, refreshUser }) => {
  const onLogoutClick = () => {
    authService.signOut();
  };

  return (
    <>
      <Wavemaker/>
      <button onClick={onLogoutClick} className = "LogOut">Log Out</button>      
      <Calendardraw/>      
    </>
  );
};
