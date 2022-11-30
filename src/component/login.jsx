import React from "react";
import { useState } from "react";
import "./css/sign.css";
import "../firebase.js";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function Login({ setIsLoddined }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  // auth 로그인 함수
  const signin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoddined(true);
      setEmail("");
      setPassword("");
      window.location.href = "/";
    } catch (err) {
      // console.log(err.code);
      if (err.code === "auth/user-not-found") {
        alert("가입되지 않은 아이디입니다. 회원가입 후 이용해주세요.");
        setEmail("");
        setPassword("");
        window.location.href = "/join";
      }
      if (err.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
        setPassword("");
      }
      if (err.code === "auth/invalid-email") {
        alert("이메일 형식이 맞지않습니다. 이메일 전체를 입력해주세요");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <form className="logBox">
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

      <a href="/join" id="joinHerf">
        계정이 없으신가요? 회원가입하기
      </a>
      <button id="submitBtn" onClick={signin}>
        로그인
      </button>
    </form>
  );
}
export default Login;
