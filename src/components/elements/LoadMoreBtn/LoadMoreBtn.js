import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = props => {
  return (
    <div
      className='rmdb-loadmorebtn'
      onClick={props.onClick}
      style={{ marginTop: "25px", fontSize: "35px" }}
    >
      Load More
    </div>
  );
};

export default LoadMoreBtn;
