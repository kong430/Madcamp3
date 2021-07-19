import React from "react";
import { authService, firebaseInstance, firebaseUser } from "fbase";
import '../index';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
    console.log("user " + firebaseInstance.auth().currentUser.uid);
  };

  return (
    <div>
      <div className="outer">
        <div className = "inner">
      <div>
        <button onClick={onSocialClick} name="google" className = "google">
          Continue with Google
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

console.log("Auth!!!!!!!!!!!!!!!!");

export default Auth;

//jBazOsXyA7QZ3GDYaB0zPWzPBOz2

//1rVM1CwB3Jgs5MfED1K0pObT9cl2