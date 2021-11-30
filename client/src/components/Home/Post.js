import React from "react";
import "./Post.css";
const Post = (props) => {
  return (
    <>
      <div className="card_post">
        <img
          src={props.img}
          width="800"
          height="500"
          alt="naruto"
          placeholder="/img/naruto.jpg"
        />
        <p>{props.text}</p>
      </div>
    </>
  );
};

export default Post;
