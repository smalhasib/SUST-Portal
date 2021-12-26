import React, { useState, useRef } from "react";
import "./CourseItem.css";
import MaterialItem from "./MaterialItem";

const CourseItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef();

  if (parentRef.current) console.log(parentRef.current.scrollHeight);

  const handleToggleCLick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="collapsible">
        <button className="toggle" onClick={handleToggleCLick}>
          {props.name}
        </button>
        <div
          className="content-parent"
          ref={parentRef}
          style={
            isOpen
              ? {
                  height: parentRef.current.scrollHeight + "px",
                }
              : {
                  height: "0px",
                }
          }
        >
          <div className="content">
            <MaterialItem/>
            <MaterialItem/>
            <MaterialItem/>
            <MaterialItem/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseItem;
