// import { useState } from "react";
import React from "react";

function Post({ data }) {
  return (
    <div className="post">
      <p>
        {data.postDate}
        <span></span>
      </p>

      <h1>{data.postTitle}</h1>
    </div>
  );
}
export default Post;
