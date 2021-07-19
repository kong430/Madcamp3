import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { firebaseInstance } from "fbase";
import { dbService } from "fbase";

function App(props) {
  console.log("APP!!!");
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  var userData = null;

  console.log("App!!!!!!!!!!!!");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    console.log(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          userData = {props.userData}
        />
      ) : (
        "loading..."
      )}
    </>
  );
}

export default App;
