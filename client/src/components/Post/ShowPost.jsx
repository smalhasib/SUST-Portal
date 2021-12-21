import React, { useEffect, useState } from "react";
import "./ShowPost.css";
const ShowPost = () => {
  const [post, setPost] = useState([
    {
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/post/showpost")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((response) => setPost(response));
  }, []);

  return (
    <>
      <div className="showpost_container">
        {post.map((post, key) => {
          return (
            <div className="show_post" key={key}>
              <h3> {post.title} </h3> <p> {post.description} </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowPost;
