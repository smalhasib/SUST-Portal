import React from "react";
import { Route, Routes } from "react-router-dom";
import DailyUpdates from "./components/DailyUpdates/DailyUpdates";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Registration/Register";
import Resources from "./components/Resources/Resources";
import Verificaiton from "./components/Authentication/Verification/Verificaiton";
import Logout from "./components/Authentication/Logout/Logout";
import BlogPost from "./components/BlogPost/BlogPost";
import Home from "./components/HomePage/Home";
import Profile from './components/Profile/Profile'
import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/dailyupdates" element={<DailyUpdates />} />
      <Route path="/verify" element={<Verificaiton />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/blogs" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
