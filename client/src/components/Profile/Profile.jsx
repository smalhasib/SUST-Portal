import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import dp from "./profile_img.jpg"

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    department: "",
    registration: "",
    email: "",
    password: "",
  });
  const callAboutpage = async () => {
    try {
      const token = localStorage.getItem("jwtoken");
      const res = await axios.get("http://localhost:5000/profile", {
        params: {
          profileToken: token,
        },
      });
      setUserData(res.data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutpage();
  }, []);
  return (
    <>
      <Header />
      <div className="about_container">
        <div className="about">
          <div className="dp">
             <img src={dp} alt="" />
            <div className="image">
              <input type="file" className="dp_file" />
              <button>upload</button>
            </div>
          </div>

          <div className="user_details">
            <div className="user">
              <i class="fas fa-user"></i>
              <h2>{userData.name}</h2>
              <i class="fas fa-edit"></i>
            </div>
            <div className="depReg">
              <h4>Registration: {userData.registration}</h4>
              <h4>Department: {userData.department}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
