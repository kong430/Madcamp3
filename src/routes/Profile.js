import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
  const onLogoutClick = () => {
    authService.signOut();
  };

  return (
    <>
      <button onClick={onLogoutClick} className = "LogOut">Log Out</button>
    </>
  );
};
