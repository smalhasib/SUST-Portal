import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import "./Post.css";
import jwt_decode from "jwt-decode";

const options = [
  { value: "All", label: "All" },
  { value: "Educational", label: "Educational" },
  { value: "Official", label: "Official" },
  { value: "Political", label: "Political" },
  { value: "Organization", label: "Organization" },
];

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [type, setType] = useState("");

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const token = localStorage.getItem("jwtoken");
  const decoded = jwt_decode(token);

  const UploadMultipleFiles = async () => {
    if (description.length > 0 || multipleFiles.length > 0) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("name", decoded.name);
      formData.append("department", decoded.department);

      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append("files", multipleFiles[i]);
      }

      await axios
        .post("http://localhost:5000/post/post", formData)
        .catch((err) => console.log(err));
    } else {
      alert("Please write your post..");
    }
    window.location.reload();
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

          <Select
            options={options}
            onChange={(e) => setType(e.value)}
            placeholder="Type"
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: "200px",
                marginLeft: "20px",
                border: "1px soldi gray ",
              }),
              control: (provided, state) => ({
                ...provided,
                border: 0,
                boxShadow: "none",
              }),
            }}
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
