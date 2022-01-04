import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowPost.css";
import Comment from "./Comment";
import jwt_decode from "jwt-decode";

const ShowPost = ({ id, name, department, title, description, files }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const user = jwt_decode(localStorage.getItem("jwtoken"));

  const getComments = async () => {
    await axios
      .get("http://localhost:5000/post/fetchComments", {
        params: {
          postId: id,
        },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  };

  const CommentHandler = () => {
    if (newComment.length < 1) return;

    axios
      .post("http://localhost:5000/post/comment", {
        postId: id,
        userId: user._id,
        comment: newComment,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setNewComment("");
  };

  const commentTextHandler = (e) => {
    setNewComment(e.target.value);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="show_post">
        <div className="user_post">
          <i className="fas fa-user"></i>
          <div className="user_dtl">
            <h5>{name}</h5>
            <h6>{department}</h6>
          </div>
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
        {files.map((file, index) => (
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
            value={newComment}
            placeholder="comments...."
            onChange={commentTextHandler}
          />
          <button onClick={CommentHandler}>comment</button>
        </div>
        {comments !== 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              userName={comment.user.name}
              department={comment.user.department}
              text={comment.text}
            />
          ))}
      </div>
    </>
  );
};
export default ShowPost;
