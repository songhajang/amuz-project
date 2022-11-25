import React from "react";
import { useState } from "react";
import "./css/sign.css";
import { db } from "../firebase.js";
// import { collection, getDocs } from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

function Test() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signin = async (e) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
    // setIsLoddined(true);
    setEmail("");
    setPassword("");
    window.location.href = "/";
  };

  return (
    <div className="logBox">
      <h2>로그인</h2>
      <input
        type="text"
        id="loginId"
        name="loginId"
        placeholder="login"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <a href="/join" id="joinBtn">
        계정이 없으신가요? 회원가입하기
      </a>
      <button id="submitBtn" onClick={signin}>
        로그인
      </button>
    </div>
  );
}
export default Test;
