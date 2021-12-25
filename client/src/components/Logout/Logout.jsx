import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  // const token = localStorage.getItem('jwtoken')
  // console.log(token)
  const navigate = useNavigate();
  const logoutPage = () => {
    const token = localStorage.removeItem("jwtoken");
    if (!token) {
      navigate("/");
    } else {
      navigate("/home");
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
