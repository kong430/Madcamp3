import React from "react";
import { authService, firebaseInstance } from "fbase";
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

export default Auth;
