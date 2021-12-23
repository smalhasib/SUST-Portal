import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_logo">
          <img src="/img/sust.jpg" alt="logo" />
          <Link to="/" className="nav_text">
            SUST-PORTAL
          </Link>
        </div>
        <div className="navbar_link">
          <Link to="/home" className="nav_text">
            Blogs of SUST
          </Link>
          <Link to="/home" className="nav_text">
            Resourses
          </Link>
          <Link to="/home" className="nav_text">
            About
          </Link>
          <Link to="/" className="nav_text">
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
