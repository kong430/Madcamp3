import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState();

  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyCareer = async () => {
    await dbService
      .collection("career")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    //console.log(careers.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyCareer();
  });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  return (
    <>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};
