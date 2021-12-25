import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import reglogo from "./sust.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    department: "",
    registration: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, department, registration, email, password } = user;
    if (name && department && registration && email && password) {
      axios.post("http://localhost:5000/register", user).then((res) => {
        navigate("/verify");
      });
    } else {
      alert("Please fillup your informations.");
    }
  };
  return (
    <>
      <div className="reg_container">
        <div className="reg_wrapper">
          <div className="reg_logo">
            <img src={reglogo} alt="reglogo" />
          </div>
          <div className="form">
            <div className="input_field">
              <input
                type="text"
                placeholder="Full name"
                className="input"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="input_field">
              <input
                type="text"
                placeholder="Department"
                className="input"
                name="department"
                value={user.department}
                onChange={handleChange}
              />
              <i className="fas fa-building"></i>
            </div>
            <div className="input_field">
              <input
                type="text"
                placeholder="Registration no."
                className="input"
                name="registration"
                value={user.registration}
                onChange={handleChange}
              />
              <i className="fas fa-registered"></i>
            </div>
            <div className="input_field">
              <input
                type="text"
                placeholder="Email"
                className="input"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="input_field">
              <input
                type="password"
                placeholder="Password"
                className="input"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <i className="fas fa-lock"></i>
            </div>
            <div className="btn" onClick={register}>
              Register
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
