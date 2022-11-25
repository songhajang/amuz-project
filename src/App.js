import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./componented/home";
import Login from "./componented/login";
import SignUp from "./componented/signUp";
import Test from "./component/test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<SignUp />} />
    </Routes>
  );
}
export default App;
