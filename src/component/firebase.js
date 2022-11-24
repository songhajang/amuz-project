import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByE1BiZ43yK5or8cLImfXGWoKr9ezP270",
  authDomain: "amuz-project.firebaseapp.com",
  projectId: "amuz-project",
  storageBucket: "amuz-project.appspot.com",
  messagingSenderId: "493962976255",
  appId: "1:493962976255:web:41eb656ab49c04f3f5e5ca",
  measurementId: "G-9S6WL2Z9SK",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
