import React from "react";
import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./css/login.css";
import { db } from "../firebase.js";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import { collection, getDocs } from "firebase/firestore";

function Test() {
  const isIdData = [];
  const isPwdData = [];
  const test = [];
  const [isData, isSetData] = useState([]);
  // const [isIdDate, isSetIdDate] = useState([]);
  // const [isPwdDate, isSetPwdDate] = useState([]);
  const [isIdValue, isSetIdValue] = useState("");
  const [isPwdValue, isSetpwdValue] = useState("");
  const usersCollectionRef = collection(db, "login");

  const getUsers = async () => {
    // getDocs로 컬렉션안에 데이터 가져오기
    const data = await getDocs(usersCollectionRef);
    //   .docs[0]._document.data.value.mapValue.fields : db 값 경로
    isSetData(data);

    // isSetIdDate(isData.userId.stringValue);
    // isSetpwdDate(isData.userPwd.stringValue);
  };
  // console.log(isData);

  const Onclick = (e) => {
    e.preventDefault();
    isSetIdValue(isIdValue);
    isSetpwdValue(isPwdValue);
    // console.log(isIdValue, isPwdValue);

    isData.docs.map((data) => {
      // isIdData.push(
      //   data._document.data.value.mapValue.fields.userId.stringValue
      // );
      // isPwdData.push(
      //   data._document.data.value.mapValue.fields.userPwd.stringValue
      // );
      test.push(data._document.data.value.mapValue.fields);
      // test;
    });
    // const idTest = isIdData.filter((id) => {
    //   if (id == isIdValue) {
    //     console.log("hi");
    //     if()
    //   }
    // });
    test.filter((test) => {
      if (
        test.userId.stringValue == isIdValue &&
        test.userPwd.stringValue == isPwdValue
      ) {
        return alert("로그인되엇습니다.");
      }
      if (
        test.userId.stringValue == isIdValue &&
        test.userPwd.stringValue !== isPwdValue
      ) {
        return alert("비밀번호가 틀렸습니다. 다시 입력해주세요");
      }
      if (test.userId.stringValue !== isIdValue) {
        return alert("회원가입 후 이용 바랍니다.");
      }
    });
    // console.log(test);
  };

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
      <form id="loginArea" onSubmit={Onclick}>
        <input
          type="text"
          id="loginId"
          name="loginId"
          placeholder="login"
          value={isIdValue}
          onChange={(e) => {
            isSetIdValue(e.target.value);
          }}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={isPwdValue}
          onChange={(e) => {
            isSetpwdValue(e.target.value);
          }}
        />
        <a href="/join">계정이 없으신가요? 회원가입하기</a>
        <input type="submit" value="로그인" id="loginBtn" />
      </form>
    </div>
  );
}
export default Test;
