import React from "react";
import "./comment.css";

const comment = ({ userName, department, text }) => {
  console.log(userName, department, text);
  return (
    <>
      <div className="show_comment">
        <div className="cmt">
          <i className="fas fa-comment"></i>
          <h5>{text}</h5>
        </div>
      </div>
    </>
  );
};

export default comment;
