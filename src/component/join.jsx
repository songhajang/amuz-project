import React from "react";
import { useState } from "react";
import "./css/sign.css";
import { db } from "../firebase.js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, isSetPassword] = useState("");
  const auth = getAuth();
  const signup = async (e) => {
    try {
      if (email == "" || email !== "") {
        if (email == "" && password == "") {
          return alert("아이디와 비번을 입력해주세요.");
        }
        if (password == "") {
          return alert("비밀번호를 입력해주세요");
        }
        if (email == "") {
          return alert("아이디를 입력해주세요");
        }
      }
      if (password == isPassword) {
        if (password.length > 6) {
          if (email.includes("@") == 0) {
            alert("이메일 전체를 입력해주세요");
          } else {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = "/";
          }
        } else {
          alert("비밀번호는 최소 (영문자+숫자) 6자 이상 입니다.");
          isSetPassword("");
          setPassword("");
        }
      } else {
        alert("비밀번호를 잘못입력하셨습니다. 다시 입력해주세요.");
        isSetPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="logBox">
      {/* {isLoddined ? "로그인됨" : "안됨"} */}
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

      <button onClick={signup}>회원가입</button>
    </div>
  );
}
export default Join;
