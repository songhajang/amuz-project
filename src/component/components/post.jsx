// import { useState } from "react";
import React from "react";

function Post({ data, getData }) {
  if (data.length !== 0) {
    return data.map((test, index) => (
      <div className="post" key={index}>
        <p>
          {test.postDate}
          <span></span>
        </p>

        <h1>{test.postTitle}</h1>
      </div>
    ));
  } else if (data.length == 0) {
    return (
      <div className="resetGetData">
        <p>데이터가 없슴니당 ! 글을 작성주세요</p>
      </div>
    );
  } else {
    return (
      <div className="resetGetData">
        <div>데이터를 불러오지 못했어요 . 새로고침버튼을 눌러주세요!</div>
        <button onClick={getData}>새로고침</button>
      </div>
    );
  }
}
export default Post;
