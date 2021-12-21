import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Home/Homepage";
import Login from "./Login/Login";
import Register from "./Registration/Register";
import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
