import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterPost from "./FilterPost/FilterPost";
import Header from "../Header/Header";
import PinPost from "./PinPost/PinPost";
import Post from "./Post/Post";
import PostBox from "./Post/PostBox";
import "./DailyUpdates.css";
import axios from "axios";

const DailyUpdates = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [click, setClick] = useState(false);

  const filterHandler = (selectedFilter) => {
    getPost(selectedFilter);
  };

  const getPost = async (filter = "All") => {
    await axios
      .get("http://localhost:5000/post/fetch", {
        params: {
          type: filter,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      navigate("/login");
      return;
    }
    getPost();
  }, []);

  return (
    <>
      <Header />
      <div className="dailyupdates">
        <FilterPost filterHandler={filterHandler} />
        <div className="create_btn">
          <button onClick={() => setClick(!click)}>Create Post</button>
        </div>
        {click ? <PostBox /> : ""}
        <div className="showPost">
          {posts.length !== 0 &&
            posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                name={post.name}
                department={post.department}
                title={post.title}
                description={post.description}
                files={post.files}
              />
            ))}
        </div>
        <PinPost />
      </div>
    </>
  );
};

export default DailyUpdates;
