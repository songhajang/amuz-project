import React from "react";
import "./css/sign.css";
function LoginOut() {
  return (
    <div className="logBox">
      <p>로그인 후 이용 바랍니다.</p>
      <a href="/login" id="loginHerf">
        로그인하기
      </a>
    </div>
  );
}
export default LoginOut;
