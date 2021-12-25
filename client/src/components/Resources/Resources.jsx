import React, { useState } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import "./Resources.css";

const Resources = () => {
  const [selected, setSelected] = useState("Choose a department");

  console.log(selected);

  return (
    <>
      <Header />
      <div
        className="resource_container"
        style={{
          backgroundImage: `url("/img/archive.png")`,
        }}
      >
        <div className="resource_text">
          <p>SUST EDUCATIONAL ARCHIVE</p>
        </div>
        <div className="resource_option">
          <Dropdown selected={selected} setSelected={setSelected} />
          <button>Upload Resource</button>
        </div>
      </div>
    </>
  );
};

export default Resources;
