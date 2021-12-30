import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    department: "",
    registration: "",
    email: "",
    password: "",
  });

  const callAboutpage = async () => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      navigate("/login")
    } else {
      await axios.get("http://localhost:5000/profile", {
        params: {
          profileToken: token,
        },
      })
      .then((data) => setUserData(data.data))
      .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    callAboutpage();
  });

  return (
    <>
      <Header />
      <div className="about_container">
        <div className="dp">
          <img src="/img/sust.jpg" alt="DP" />
        </div>
        <div className="user_details">
          <h4>{userData.name}</h4>
          <h5>{userData.email}</h5>
          <h6>{userData.registration}</h6>
          <h6>{userData.department}</h6>
        </div>
      </div>
    </>
  );
};

export default About;
