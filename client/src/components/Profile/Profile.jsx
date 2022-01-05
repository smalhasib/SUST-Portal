import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    department: "",
    registration: "",
    email: "",
    password: "",
    image: {
      fileName: "",
      filePath: "",
      fileType: "",
      fileSize: "",
    },
  });
  const [file, setFile] = useState("");

  const user = jwt_decode(localStorage.getItem("jwtoken"));

  const callAboutpage = async () => {
    try {
      const token = localStorage.getItem("jwtoken");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get("http://localhost:5000/profile", {
        params: {
          profileToken: token,
        },
      });
      setUserData(res.data);
      console.log(res.data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const imageUpdateHandler = () => {
    if (!file) {
      alert("Select a image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);

   axios
      .post("http://localhost:5000/updateProfile", formData)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => alert(err));
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
            <div className="dp_img">
              {userData.image.filePath !== "" ? (
                <img
                  src={`http://localhost:5000/${userData.image.filePath}`}
                  alt=""
                />
              ) : (
                <img src="/img/profile_img.jpg" alt="" />
              )}
            </div>
            <div className="image">
              <input
                type="file"
                className="dp_file"
                onChange={fileSelectedHandler}
              />
              <button onClick={imageUpdateHandler}>upload</button>
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
