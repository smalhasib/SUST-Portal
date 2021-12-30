import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENT } from "../../../data";
import axios from "axios";
import Select from "react-select";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    department: "",
    registration: "",
    email: "",
    password: "",
  });

  const dept = DEPARTMENT.map((dept) => ({
    value: dept.short,
    label: dept.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const deptSelectHandler = (selected) => {
    setUser({
      ...user,
      department: selected.label,
    });
  };

  const register = () => {
    const { name, department, registration, email, password } = user;
    if (name && department && registration && email && password) {
      if (registration.length === 10) {
        localStorage.setItem("userEmail", email);
        axios.post("http://localhost:5000/register", user).then((res) => {
          navigate("/verify");
        });
      } else {
        alert("Please provide correct registration number");
      }
    } else {
      alert("Please fillup your informations.");
    }
  };

  return (
    <>
      <div className="reg_container">
        <div className="reg_wrapper">
          <div className="reg_logo">
            <img src="/img/sust.jpg" alt="reglogo" />
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
            <div className="input_field_selector">
              <Select
                styles={{
                  container: (provided, state) => ({
                    ...provided,
                    width: "390px",
                    marginLeft: "39px",
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    background: "#eeeeee",
                    borderRadius: "20px",
                  }),
                  placeholder: (provided, state) => ({
                    ...provided,
                    color: "#1d2120",
                  }),
                }}
                options={dept}
                onChange={deptSelectHandler}
                placeholder="Select Department"
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
