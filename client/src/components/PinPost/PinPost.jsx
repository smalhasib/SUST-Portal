import React from "react";
import onekm from "./onekilo.jpg";
import "./PinPost.css";
import SM from "./sahidminar.jpg";
const PinPost = () => {
  return (
    <>
      <div className="pinpost_container">
        <div className="pinpost">
          <img src={SM} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            repudiandae tempora eveniet at expedita a quia unde et, quasi
            laborum?
          </p>
        </div>
        <div className="pinpost">
          <img src={onekm} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            repudiandae tempora eveniet at expedita a quia unde et, quasi
            laborum?
          </p>
        </div>
      </div>
    </>
  );
};

export default PinPost;
