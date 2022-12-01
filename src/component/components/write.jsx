import React, { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";

function Write({ onClickModal, app, writeModal, getData, setWriteLoading }) {
  const [addData, setAddData] = useState("");
  const onClickWriteModal = () => {
    onClickModal(false);
  };
  // firestore 문서 추가 함수
  const docRef = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    await addDoc(collection(db, "post"), {
      postTitle: addData,
      postDate: new Date().toISOString().split("T")[0],
      postTime: new Date().toTimeString().split("GM")[0],
    });
    setWriteLoading(false);
    if (writeModal) {
      onClickModal(false);
    }
    getData();
    setAddData("");
  };
  return (
    <form onSubmit={docRef}>
      <div className="popUp-div">
        <h1>글 작성</h1>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="작성할 글을 입력해주세요."
        value={addData.substring(0, 19)}
        onChange={(e) => {
          setAddData(e.target.value);
        }}
      ></textarea>
      <p className="countTitle">{addData.length} / 20</p>
      <div className="popUp-div buttons">
        <input
          type="button"
          value="취소"
          className="cancellation"
          onClick={onClickWriteModal}
          style={writeModal ? { display: "block" } : { display: "none" }}
        />
        <input type="submit" value="게시" className="posting" />
      </div>
    </form>
  );
}
export default Write;
