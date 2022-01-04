import React from "react";
import "./comment.css";

const comment = ({ userName, text }) => {
  console.log(userName, text);
  return (
    <>
      <div className="show_comment">
        <div className="cmt">
          <i className="fas fa-comment"></i>
          <div className="txt">
          <h6>{userName}</h6>
          <p>{text}</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default comment;
