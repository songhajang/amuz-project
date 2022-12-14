import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Join from "./component/join";
import Home from "./component/home";
import "./index.css";
import { useState } from "react";

function App() {
  // 로그인 상태
  const [isLoddined, setIsLoddined] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={<Home setIsLoddined={setIsLoddined} isLoddined={isLoddined} />}
      />
      <Route path="/login" element={<Login setIsLoddined={setIsLoddined} />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}
export default App;
