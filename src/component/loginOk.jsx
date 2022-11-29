import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../img/logo.png";
import footerLogo from "../img/footer-logo.png";
import Paging from "./components/pagination";
import Loading from "./loading";
import Alarm from "./components/alarm";
import Write from "./components/write";
import Post from "./components/post";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";

function LoginOk({ email, singout }) {
  const test = [];
  const [Data, setData] = useState([]);
  const [Test, setTest] = useState([]);
  const [writeLoading, setWriteLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [writeModal, setwriteModal] = useState(false);
  const [isMatchMedia, setIsMatchMedia] = useState(false);
  const [styleMatchMedia, setStyleMatchMedia] = useState(false);

  const onClickModal = () => {
    setwriteModal(!writeModal);
  };

  const getData = async () => {
    setPostLoading(false);
    setWriteLoading(false);
    const firebase = getFirestore(app);
    const datas = collection(firebase, "post");

    const result = query(
      datas,
      orderBy("postDate", "desc"),
      orderBy("postTime", "desc")
    );
    const data = await getDocs(result);
    data.forEach((docs) => {
      test.push(docs.data());
    });
    setData(test);
    setTest(test);
    paging();
    setPostLoading(true);
    setWriteLoading(true);
  };

  const paging = async () => {
    setTest(test.slice((currentPage - 1) * 15, currentPage * 15));
  };

  useEffect(() => {
    getData();
    paging();
    if (window.innerWidth < "1600") {
      setIsMatchMedia(true);
      if (window.matchMedia("(max-width: 944px)").matches) {
        setStyleMatchMedia(true);
      } else setStyleMatchMedia(false);
    } else setIsMatchMedia(false);
    const listener = window.addEventListener("resize", () => {
      if (window.matchMedia("(max-width: 1600px)").matches) {
        setIsMatchMedia(true);
        if (window.matchMedia("(max-width: 944px)").matches) {
          setStyleMatchMedia(true);
        } else setStyleMatchMedia(false);
      } else setIsMatchMedia(false);
    });
    return () => window.removeEventListener("resize", listener);
  }, [currentPage]);
  return (
    <>
      <div className="header">
        <p>
          환영합니다. <strong>{email}</strong>님.
        </p>
        <button id="loginOutBtn" onClick={singout}>
          로그아웃
        </button>
      </div>
      <div
        className="bgModal"
        style={writeModal ? { display: "block" } : { display: "none" }}
      >
        <div className=" wh-Modal">
          <button
            id="closeBtn"
            className="close"
            onClick={onClickModal}
            style={writeModal ? { display: "block" } : { display: "none" }}
          ></button>
          {writeLoading ? (
            <Write
              onClickModal={onClickModal}
              app={app}
              writeModal={writeModal}
              colseModal={setwriteModal}
              getData={getData}
              setWriteLoading={setWriteLoading}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>

      <div
        className="popUpIcon"
        onClick={onClickModal}
        style={
          isMatchMedia
            ? { transform: "translateX(0%)" }
            : { transform: "translateX(200%)" }
        }
      >
        +
      </div>

      <div
        className="popUp"
        style={
          isMatchMedia
            ? { transform: "translateX(200%)" }
            : { transform: "translateX(00%)" }
        }
      >
        {writeLoading ? (
          <Write
            onClickModal={onClickModal}
            app={app}
            writeModal={writeModal}
            getData={getData}
            setWriteLoading={setWriteLoading}
          />
        ) : (
          <Loading />
        )}
      </div>
      <section className="main">
        <img src={logo} alt="컴과고로고" />
        <h1>
          컴과고 <br /> 대신 전해드립니다.
        </h1>
      </section>
      <section className="alarm">
        <Alarm title="글 작성할때 욕설은 금지입니다." />
        <Alarm title="로그인 후 이용 부탁드립니다." />
      </section>
      <section
        className="posts"
        style={
          styleMatchMedia
            ? { justifyContent: "center" }
            : { justifyContent: "flex-start" }
        }
      >
        {postLoading ? <Post data={Test} getData={getData} /> : <Loading />}
      </section>
      <section className="pages">
        <Paging
          count={Data.length}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </section>
      <section className="footer">
        <img src={footerLogo} alt="로고" />
        <p>부산컴퓨터과학고등학교</p>
      </section>
    </>
  );
}
export default LoginOk;
