// import { useState } from "react";
import React from "react";

function Post({ data, code, liked }) {
  if (!data) {
    return (
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h3>리스트를 받아오지 못했어요 로그인 후 다시 해보세요!</h3>
      </div>
    );
  }

  return (
    <div className="post" key={data.postId} id={data.postId}>
      <p>
        {data.created.split("T")[0]}
        <span></span>
      </p>

      <h1>{data.description}</h1>
    </div>
  );
}
export default Post;
