import React, { useEffect } from "react";
import { useState } from "react";
import "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginOk from "./loginOk.jsx";
import LoginOut from "./loginOut.jsx";
function Home({ isLoddined, setIsLoddined }) {
  const [email, setEmail] = useState("");

  const auth = getAuth();

  // 로그아웃 함수
  const singout = async () => {
    await auth.signOut();
    setIsLoddined(false);
  };

  useEffect(() => {
    // firebase auth 상태 확인
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoddined(true);
        setEmail(user.email);
      } else {
        setIsLoddined(false);
        setEmail("");
      }
    });
  }, [setIsLoddined, auth]);
  return (
    <div>
      <h2>Home</h2>
      {isLoddined ? <LoginOk email={email} singout={singout} /> : <LoginOut />}
    </div>
  );
}
export default Home;
