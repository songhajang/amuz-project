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
  const dataArr = [];
  const [Data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [writeLoading, setWriteLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [writeModal, setwriteModal] = useState(false);
  // write 반응
  const [isMatchMedia, setIsMatchMedia] = useState(false);
  // post 반응
  const [styleMatchMedia, setStyleMatchMedia] = useState(false);

  const onClickModal = () => {
    setwriteModal(!writeModal);
  };
  // 데이터 들고오는 함수
  const getData = async () => {
    setPostLoading(false);
    setWriteLoading(false);
    const firebase = getFirestore(app);
    const datas = collection(firebase, "post");

    // 데이터 내림차순 정렬
    const result = query(
      datas,
      orderBy("postDate", "desc"),
      orderBy("postTime", "desc")
    );
    // 정렬된 데이터 들고오기
    const data = await getDocs(result);
    data.forEach((docs) => {
      dataArr.push(docs.data());
    });
    setData(dataArr);
    setPostData(dataArr);
    paging();
    setPostLoading(true);
    setWriteLoading(true);
  };
  // 페이지 나누기 함수
  const paging = async () => {
    setPostData(dataArr.slice((currentPage - 1) * 15, currentPage * 15));
  };

  useEffect(() => {
    getData();
    paging();
    // 반응형 첫 화면 반응
    if (window.innerWidth < "1600") {
      setIsMatchMedia(true);
      if (window.matchMedia("(max-width: 944px)").matches) {
        setStyleMatchMedia(true);
      } else setStyleMatchMedia(false);
    } else {
      setIsMatchMedia(false);
      setwriteModal(false);
    }
    // 반응형
    const listener = window.addEventListener("resize", () => {
      if (window.matchMedia("(max-width: 1600px)").matches) {
        setIsMatchMedia(true);
        if (window.matchMedia("(max-width: 944px)").matches) {
          setStyleMatchMedia(true);
        } else setStyleMatchMedia(false);
      } else {
        setIsMatchMedia(false);
        setwriteModal(false);
      }
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
              onClickModal={setwriteModal}
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
          송하가 <br /> 대신 전해드립니다.
        </h1>
      </section>
      <section className="alarm">
        <Alarm title="안녕하세요. 여긴 송하의 익명 게시판입니다." />
        <Alarm title="자유롭게 작성해주세용." />
      </section>
      <section
        className="posts"
        style={
          styleMatchMedia
            ? { justifyContent: "center" }
            : { justifyContent: "flex-start" }
        }
      >
        {postLoading ? <Post data={postData} getData={getData} /> : <Loading />}
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
