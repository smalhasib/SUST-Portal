import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Login from "./Login/Login";
import Register from "./Registration/Register";
import Resources from "./components/Resources/Resources";
import Verificaiton from "./components/Verification/Verificaiton";
import About from "./components/About/About"
import Logout from "./components/Logout/Logout";
import BlogPost from "./components/BlogPost/BlogPost";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/verify" element={<Verificaiton />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/about" element={<About />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/blogs" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
