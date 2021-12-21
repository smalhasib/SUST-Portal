import axios from "axios";
import React, { useState } from "react";
import "./Post.css";
import ShowPost from "./ShowPost";
const Post = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };
  const Post = () => {
    axios.post("http://localhost:5000/post/post", post).then((res) => {
      alert(res.data.message);
      setPost({ title: "", description: "" });
    });
  };
  return (
    <>
      <div className="post_container">
        <div className="input_field">
          <input
            type="text"
            placeholder="Title"
            className="input_title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className="input_field">
          <textarea
            type="text"
            placeholder="Write what you think..."
            className="input"
            name="description"
            value={post.description}
            onChange={handleChange}
            cols="60"
            rows="5"
          ></textarea>
        </div>
        <div className="btn" onClick={Post}>
          Post
        </div>
      </div>
      <ShowPost />
    </>
  );
};

export default Post;
