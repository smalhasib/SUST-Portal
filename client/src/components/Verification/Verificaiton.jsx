import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Verification.css";
import authImg from "./verifyImg.jpg";

const Verificaiton = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const CodeInput = (e) => {
    const { value } = e.target;
    setCode(value);
    console.log(code);
  };
  const CheckCode = () => {
    if (code === "12345") {
      navigate("/");
    } else {
      alert("Your email is invalid.");
      navigate("/register");
    }
    console.log(code);
  };
  return (
    <>
      <div className="verification_container">
        <div className="verify_details">
          <img src={authImg} alt="" />
          <p>
            We send verification code in your. Use the code and go to login
            page.
          </p>
        </div>
        <div className="verify_code">
          <i class="fas fa-user-check"></i>
          <input
            type="number"
            name="code"
            value={code.code}
            placeholder="Verificaiton code"
            onChange={CodeInput}
          />
        </div>
        <button onClick={CheckCode}>Submit</button>
      </div>
    </>
  );
};

export default Verificaiton;
