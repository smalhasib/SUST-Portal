import React from "react";
import "./Post.css";

const PinPost = (props) => {
  return (
    <>
      <div className="card_post">
        <img
          src={props.img}
          width="300"
          height="100"
          alt="naruto"
        />
        <p>{props.text}</p>
      </div>
    </>
  );
};

export default PinPost;
