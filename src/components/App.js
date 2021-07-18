import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { firebaseInstance } from "fbase";
import { dbService } from "fbase";

function App() {
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
      bringData();
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

 const bringData = async() => {
    console.log("APP bringDATA!!!!!!!!!!!!");
    if (firebaseInstance.auth().currentUser!= null){
      console.log("APP user!!!!!!!!");
      var uid = firebaseInstance.auth().currentUser.uid;

      var docRef = dbService.collection("Users").doc(uid);

      docRef.get().then((doc) => {
          if (doc.exists) {
            userData = doc.data();
            console.log("APP userData", userData);
            console.log("data:", doc.data());
            console.log(doc.data());
            console.log(doc.data().emodataList.findIndex
            (i=>i.year === 2021 && i.month === 7 && i.day === 19));
          } else {
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          userData = {userData}
        />
      ) : (
        "loading..."
      )}
    </>
  );
}

export default App;
