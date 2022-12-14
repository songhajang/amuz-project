// import React, { useState } from "react";
import "./css/Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={15}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={setPage}
    ></Pagination>
  );
};
export default Paging;
