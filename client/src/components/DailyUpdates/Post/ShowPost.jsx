import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowPost.css";
import Comment from "./Comment";
const ShowPost = () => {
  const [allPost, setallPost] = useState([]);
  const [comment, setcomment] = useState("");
  const [newcomment, setNewcomment] = useState([]);

  const getPost = async () => {
    const showPost = await axios.get("http://localhost:5000/post/postget");
    setallPost(showPost.data);
  };

  const Comments = (e) => {
    e.preventDefault();
    if (comment.length < 0) return;
    setNewcomment((prevcomment) => {
      return [...prevcomment, comment];
    });
    setcomment(null);
  };

  useEffect(() => {
    getPost();
  });

  return (
    <>
      <div className="showpost_container">
        {allPost.map((element, index) => (
          <div key={element._id} className="show_post">
            <div className="user_post">
              <i className="fas fa-user"></i>
              <div className="user_dtl">
                <h5>{element.name}</h5>
                <h6>{element.department}</h6>
              </div>
            </div>
            <h4>{element.title}</h4>
            <p>{element.description}</p>
            {element.files.map((file, index) => (
              <img
                src={`http://localhost:5000/${file.filePath}`}
                className="img"
                alt="img"
              />
            ))}
            <div className="post_comment">
              <i className="fas fa-comments"></i>
              <input
                type="text"
                placeholder="comments...."
                onChange={(e) => setcomment(e.target.value)}
              />
              <button onClick={Comments}>comment</button>
            </div>
            {newcomment.map((comment, key) => {
              return <Comment comment={comment} />;
            })}
          </div>
        ))}
      </div>
    </>
  );
};
export default ShowPost;
