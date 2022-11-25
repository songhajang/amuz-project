import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
// import firebase from "./firebase";

import { BrowserRouter } from "react-router-dom";

// console.log(firebase);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
