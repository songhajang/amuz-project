import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { deleteField, getFirestore } from "firebase/firestore";

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
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

// firestore
//   .collection("test")
//   .doc("friend")
//   .get()
//   .then((doc) => {
//     this.setState({
//       data: doc.data().friend_count,
//     });
// });
