import React from "react";
import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./css/login.css";
import { db } from "../firebase.js";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import { collection, getDocs } from "firebase/firestore";

function Test() {
  const [isData, isSetData] = useState([]);
  const [isIdDate, isSetIdDate] = useState([]);
  const [ispwdDate, isSetpwdDate] = useState([]);

  const [isIdValue, isSetIdValue] = useState("");
  const [ispwdValue, isSetpwdValue] = useState("");
  const usersCollectionRef = collection(db, "login");

  const getUsers = async () => {
    // getDocs로 컬렉션안에 데이터 가져오기
    const data = await getDocs(usersCollectionRef);
    isSetData(data.docs[0]._document.data.value.mapValue);
  };
  console.log(isData);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="login_card">
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
      <form id="loginArea">
        <input type="text" id="loginId" name="loginId" placeholder="login" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <a href="/join">계정이 없으신가요? 회원가입하기</a>
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
}
export default Test;
