import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Verification.css";

const Verificaiton = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const CodeInput = (e) => {
    const { value } = e.target;
    setCode(value);
  };

  const CheckCode = () => {
    if (code.length === 6) {
      axios.post("http://localhost:5000/verify", { code: code }).then((res) => {
        if (res.status === 200) {
          navigate("/login");
        } else {
          alert(res.data.error);
        }
      });
    } else {
      alert("Please enter valid code.");
    }
  };

  const ResendCodeHandler = () => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios
        .post("http://localhost:5000/resend", { email: email })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Request could not be completed");
        });
    }
  };

  return (
    <>
      <div className="verification_container">
        <div className="verify_details">
          <img src="/img/verifyImg.jpg" alt="" />
          <p>
            We send verification code in your. Use the code and go to login
            page.
          </p>
        </div>
        <div className="verify_code">
          <i className="fas fa-user-check"></i>
          <input
            type="number"
            name="code"
            value={code.code}
            placeholder="Verificaiton code"
            onChange={CodeInput}
          />
        </div>
        <button onClick={CheckCode}>Submit</button>
        <div className="verify_code_resend">
          <p>Didn't get the code?</p>
          <button onClick={ResendCodeHandler}>Resend Code</button>
        </div>
      </div>
    </>
  );
};

export default Verificaiton;
