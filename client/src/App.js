import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Login from "./Login/Login";
import Post from "./Post/Post";
import ShowPost from "./Post/ShowPost";
import Register from "./Registration/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/post" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/showpost" element={<ShowPost />} />
    </Routes>
  );
}

export default App;
