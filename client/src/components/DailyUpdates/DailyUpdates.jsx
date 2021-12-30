import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterPost from "./FilterPost/FilterPost";
import Header from "../Header/Header";
import PinPost from "./PinPost/PinPost";
import ShowPost from "./Post/ShowPost";
import Post from "./Post/Post";
import "./DailyUpdates.css";

const DailyUpdates = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <Header />
      <div className="dailyupdates">
        <FilterPost />
        <div className="create_btn">
          <button onClick={() => setClick(!click)}>Create Post</button>
        </div>
        {click ? <Post /> : ""}
        <ShowPost />
        <PinPost />
      </div>
    </>
  );
};

export default DailyUpdates;
