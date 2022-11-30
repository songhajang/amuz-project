import React from "react";
import { useState } from "react";
import "./css/sign.css";
import "../firebase.js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, isSetPassword] = useState("");
  const auth = getAuth();
  // auth 회원가입 함수
  const signup = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || email !== "") {
        if (email === "" && password === "") {
          return alert("아이디와 비번을 입력해주세요.");
        }
        if (password === "") {
          return alert("비밀번호를 입력해주세요");
        }
        if (email === "") {
          return alert("아이디를 입력해주세요");
        }
      }
      if (password === isPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = "/";
      } else {
        alert("비밀번호를 잘못입력하셨습니다. 다시 입력해주세요.");
        isSetPassword("");
      }
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        alert("이메일 전체를 입력해주세요");
      }
      if (err.code === "auth/email-already-in-use") {
        alert("이미 가입한 아이디입니다.");
        window.location.href = "/login";
        isSetPassword("");
        setPassword("");
      }
      if (err.code === "auth/weak-password") {
        alert("비밀번호는 최소 (영문자+숫자) 6자 이상 입니다.");
        isSetPassword("");
        setPassword("");
      }
    }
  };

  return (
    <form className="logBox" onSubmit={signup}>
      <h2>회원가입</h2>
      <input
        type="email"
        id="loginId"
        name="loginId"
        placeholder="email@example.com"
        value={email}
        required
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
      <input
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호 재확인"
        value={isPassword}
        onChange={(e) => {
          isSetPassword(e.target.value);
        }}
      />

      <button>회원가입</button>
    </form>
  );
}
export default Join;
