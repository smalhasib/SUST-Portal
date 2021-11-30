import axios from "axios";
import React, { useState } from "react";
const Post = () => {
  const [post, setPost] = useState({
    tile: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };
  const Post = () => {
    axios.post("http://localhost:5000/post/post", post).then((res) => {
      alert(res.data.message);
    });
  };
  return (
    <>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="form">
            <div className="input_field">
              <input
                type="text"
                placeholder="title"
                className="input"
                name="title"
                value={post.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_field">
              <textarea
                type="password"
                placeholder="Description"
                className="input"
                name="description"
                value={post.description}
                onChange={handleChange}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="btn" onClick={Post}>
              <a href="/showpost">Post</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
