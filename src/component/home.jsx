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
      {isLoddined ? `환영합니다.${email}` : "로그인 후 이용바랍니다."}
      <a href="/login">로그인하기</a>
      <button onClick={singout}>로그아웃</button>
    </div>
  );
}
export default Home;
