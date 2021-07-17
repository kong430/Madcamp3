import React from "react";
import { authService, firebaseInstance } from "fbase";

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

      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
