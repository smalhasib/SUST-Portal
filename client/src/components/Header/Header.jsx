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
        <Link to="/" className="nav_text">
          Home
          </Link>
        <Link to="/dailyupdates" className="nav_text">
           Daily Updates
          </Link>
          <Link to="/blogs" className="nav_text">
            Blogs of SUST
          </Link>
          <Link to="/resources" className="nav_text">
            Resourses
          </Link>
          <Link to="/profile" className="nav_text">
            Profile
          </Link>
          <Link to="/logout" className="nav_text">
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
