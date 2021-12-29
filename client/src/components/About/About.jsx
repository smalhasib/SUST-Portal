import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
   name:"", department:"", registration:"", email:"", password:"" 
  });
  const callAboutpage = async () => {
    try {
      const token = localStorage.getItem("jwtoken");
      const res = await axios.post("http://localhost:5000/about", { token });
      console.log(res.status);
      setUserData(res.data.name);
      setUserData(res.data)
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    callAboutpage();
  }, []);
  return (
    <>
      <Header />
      <div className="about_container">
        <h2>Hello World......</h2>
        <h1>{userData.name}</h1>
        <h1>{userData.email}</h1>
        <h1>{userData.registration}</h1>
        <h1>{userData.department}</h1>
      
      </div>
    </>
  );
};

export default About;
