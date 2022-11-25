import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase.js";
import "./css/sign.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
function Home() {
  const [isLoddined, setIsLoddined] = useState(false);
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const singout = async () => {
    const res = await auth.signOut();
    setIsLoddined(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoddined(true);
        setEmail(user.email);
      } else {
        setIsLoddined(false);
        setEmail("");
      }
    });
  });
  return (
    <div className="logBox">
      <h2>Home</h2>
      {isLoddined ? (
        <div>
          <p>
            환영합니다. <strong>{email}</strong>님.
          </p>
          <button id="logoutBtn" onClick={singout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <p>로그인 후 이용 바랍니다.</p>
          <a href="/login" id="loginHerf">
            로그인하기
          </a>
        </div>
      )}
    </div>
  );
}
export default Home;
