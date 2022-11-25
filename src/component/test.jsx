import React from "react";
import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./css/login.css";
import { db } from "../firebase.js";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import { collection, getDocs } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  FirebaseAuth,
} from "firebase/auth";

function Test() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const auth = getAuth();
  const [isLoddined, setIsLoddined] = useState(false);

  const singout = async () => {
    const res = await auth.signOut();
    setIsLoddined(false);
    setEmail("");
    setPassword("");
  };
  // const signup = async (e) => {
  //   // e.preventDefault();
  //   const result = await createUserWithEmailAndPassword(auth, email, password);
  //   console.log(result);
  // };

  const signin = async (e) => {
    // e.preventDefault();
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
    setIsLoddined(true);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login_card">
      {isLoddined ? "로그인됨" : "안됨"}
      <div className="logo">
        <img
          src={logo}
          alt="컴과고로고"
          width="25%"
          style={{
            maxWidth: "50px",
          }}
        />
        <h2>컴과고 대전</h2>
      </div>
      <div id="loginArea">
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
        <a href="/join">계정이 없으신가요? 회원가입하기</a>
        <button onClick={singout}>로그아웃</button>
        <button
          // type="submit"
          // value="로그인"
          // id="loginBtn"
          onClick={signin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
export default Test;
