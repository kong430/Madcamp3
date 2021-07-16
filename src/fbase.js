import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEd-vcm9LnKRe5qbwBpBimRTl9m0ZqGQk",
  authDomain: "my-project-1626348094578.firebaseapp.com",
  projectId: "my-project-1626348094578",
  storageBucket: "my-project-1626348094578.appspot.com",
  messagingSenderId: "171403525440",
  appId: "1:171403525440:web:8282cc4fff2c9566a48ea5"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
