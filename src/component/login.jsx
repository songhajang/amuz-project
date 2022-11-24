import React, { useState } from "react";
import axios from "axios";
import loading from "../img/loading.gif";
import logo from "../img/logo.png";
import "./css/login.css";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_BACKEND_URL;

  async function login() {
    const form = new FormData();
    form.append("loginId", loginId);
    form.append("password", password);
    setIsLoading(true);

    try {
      const res = await axios.post(`${url}/login`, form, {
        withCredentials: true,
      });
      const resData = res?.data;

      if (!resData) {
        throw new Error("resData is null");
      }
      if (resData.message == "account is pending") {
        alert("계정이 승인 대기 상태입니다.");
        return;
      }
      if (resData.message == "account is disabled") {
        alert("계정이 정지당하였습니다.");
        return;
      }
      if (resData.message == "id or password not exist") {
        alert("아이디나 패스워드가 틀렸습니다.");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      if (err?.response?.data.message == "account is pending") {
        alert("계정이 승인 대기 상태입니다.");
      }
      if (err?.response?.data.message == "account is disabled") {
        alert("계정이 정지당하였습니다.");
      }
      if (err?.response?.data.message == "id or password not exist") {
        alert("아이디나 패스워드가 틀렸습니다.");
      }

      alert("로그인중 문제가 발생하였습니다. 관리자에게 문의해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  function locationToHome() {
    window.location.href = "/";
  }

  return (
    <div className="login_card">
      <div className="logo" onClick={locationToHome}>
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
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <a href="/join">계정이 없으신가요? 회원가입하기</a>
        <a href="/admin" id="adminLink">
          관리자 페이지
        </a>
      </div>
      <br />
      {isLoading ? (
        <img src={loading} alt="로딩중" width="10%" id="loadingImg" />
      ) : (
        <button id="loginBtn" onClick={login}>
          로그인
        </button>
      )}
    </div>
  );
}
export default Login;
