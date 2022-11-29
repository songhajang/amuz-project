import React, { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";

function Write({ onClickModal, app, writeModal, getData, setWriteLoading }) {
  const [addData, setAddData] = useState("");

  const docRef = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    await addDoc(collection(db, "post"), {
      postTitle: addData,
      postDate: new Date().toISOString().split("T")[0],
      postTime: new Date().toTimeString().split("GM")[0],
    });
    setWriteLoading(false);
    onClickModal();
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
        value={addData}
        onChange={(e) => setAddData(e.target.value)}
      ></textarea>
      <div className="popUp-div buttons">
        <input
          type="button"
          value="취소"
          className="cancellation"
          onClick={onClickModal}
          style={writeModal ? { display: "block" } : { display: "none" }}
        />
        <input type="submit" value="게시" className="posting" />
      </div>
    </form>
  );
}
export default Write;
