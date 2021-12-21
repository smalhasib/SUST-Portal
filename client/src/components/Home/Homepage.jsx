import React from "react";
import FilterPost from "../FilterPost/FilterPost";
import Header from "../Header/Header";
import PinPost from "../PinPost/PinPost";
import Post from "../Post/Post";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <Header />
      <div className="homepage">
        <FilterPost />
        <Post />
        <PinPost />
      </div>
    </>
  );
};

export default Homepage;
