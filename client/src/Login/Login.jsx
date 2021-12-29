import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

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

  const login = async() => {
    const res = await axios.post("http://localhost:5000/login", user)
  
    if(res.status === 200){
      console.log(res.data.token)
      localStorage.setItem('jwtoken', res.data.token)
      navigate("/home")
    }else{
      alert("You don't have any account. Please register first.")
      navigate("/")
    }
  };
  return (
    <>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="login_logo">
            <img src="/img/sust.jpg" alt="" />
          </div>
          <div className="form">
            <div className="input_field">
              <input
                type="text"
                placeholder="Email"
                className="input"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <i className="fas fa-user"> </i>
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
              <i className="fas fa-unlock-alt"> </i>
            </div>
            <div className="btn" onClick={login}>
              Login
            </div>
            <div className="logIn">
              <div className="reg">
                <Link to="/register">Register</Link>
              </div>

              <div className="forgot">
                <Link to="/">Forgot password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
