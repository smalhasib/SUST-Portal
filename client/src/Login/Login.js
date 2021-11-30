import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginLogo from "./sust.jpg";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
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

  const login = () => {
    axios.post("http://localhost:5000/login", user).then((res) => {
      alert(res.data.message);
      navigate.push("/");
    });
  };
  return (
    <>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="login_logo">
            <img src={loginLogo} alt="" />
          </div>{" "}
          <div className="form">
            <div className="input_field">
              <input
                type="text"
                placeholder="Email"
                className="input"
                name="email"
                value={user.email}
                onChange={handleChange}
              />{" "}
              <i className="fas fa-user"> </i>{" "}
            </div>{" "}
            <div className="input_field">
              <input
                type="password"
                placeholder="Password"
                className="input"
                name="password"
                value={user.password}
                onChange={handleChange}
              />{" "}
              <i className="fas fa-unlock-alt"> </i>{" "}
            </div>{" "}
            <div className="btn" onClick={login}>
              <a href="/"> Login </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Login;
