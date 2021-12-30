import axios from "axios";
import React, { useState} from "react";
import "./Post.css";
import jwt_decode from "jwt-decode";
const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");


  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  const token = localStorage.getItem('jwtoken')
  var decoded = jwt_decode(token);
  const UploadMultipleFiles = async () => {
    if(description.length>0 || multipleFiles.length>0){
     const formData = new FormData();
     formData.append("title",title);
     formData.append("description", description);
     formData.append("name", decoded.name);
     formData.append("department", decoded.department);
     for (let i = 0; i < multipleFiles.length; i++) {
       formData.append("files", multipleFiles[i]);
     }
     await axios.post("http://localhost:5000/post/post",formData);
    }else{
      alert("Please write your post..")
    }
     window.location.reload()
   };

  
  return (
    <>
      <div className="post_container">
      <div className="input_field">
            <input
              type="text"
              className="input_title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input_field">
            <textarea
              type="text"
              placeholder="Write your blog...."
              className="input"
              onChange={(e) => setdescription(e.target.value)}
              cols=""
              rows="3"
            ></textarea>
          </div>
          <div className="file_input">
            <input
              type="file"
              className="file"
              onChange={(e) => MultipleFileChange(e)}
            />
          </div>
          <button
            type="button"
            onClick={() => UploadMultipleFiles()}
            className="btn"
          >
            Post
          </button>
      </div>
    </>
  );
};

export default Post;
