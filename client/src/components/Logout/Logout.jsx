import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logoutPage = () => {
    const token = localStorage.removeItem("jwtoken");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/homepage");
    }
  };

  useEffect(() => {
    logoutPage();
  }, []);
  return(
      <>
      <h1>LogOut....</h1>
      </>
  );
};

export default Logout;
