import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Join from "./component/join";
import Home from "./component/home";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}
export default App;
