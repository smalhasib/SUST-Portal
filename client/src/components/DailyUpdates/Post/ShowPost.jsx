import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowPost.css";
import Comment from "./Comment";
import jwt_decode from "jwt-decode";

const ShowPost = () => {
  const [allPost, setallPost] = useState([]);
  const [comment, setcomment] = useState("");
  const [newcomment, setNewcomment] = useState([]);

  const user = jwt_decode(localStorage.getItem("jwtoken"));

  const getPost = async () => {
    const showPost = await axios.get("http://localhost:5000/post/fetch");
    setallPost(showPost.data);
  };

  const Comments = () => {
    if (comment.length < 1) return;

    axios
      .post("http://localhost:5000/post/comment", {
        postId: "61d360f6686baa9d8cc104fd",
        userId: user._id,
        comment: comment,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setcomment("");
  };

  const commentHandler = (e) => {
    setcomment(e.target.value);
  };

  useEffect(() => {
    getPost();
  }, []);

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
                key={file._id}
                src={`http://localhost:5000/${file.filePath}`}
                className="img"
                alt="img"
              />
            ))}
            <div className="post_comment">
              <i className="fas fa-comments"></i>
              <input
                type="text"
                value={comment}
                placeholder="comments...."
                onChange={commentHandler}
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
