import React, { useState, useRef } from "react";
import "./CourseItem.css";
import ResourceItem from "./ResourceItem";

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
            {props.data.map((resource) => (
              <ResourceItem
                key={resource._id}
                name={resource.fileName}
                link={resource.filePath}
                size={resource.fileSize}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseItem;
