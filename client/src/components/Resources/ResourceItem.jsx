import React from "react";
import "./ResourceItem.css";

const ResourceItem = ({ name, link, size }) => {
  console.log(link);
  const itemClickHandler = () => {
    window.open("http://localhost:5000/"+link, "_blank");
  };

  return (
    <>
      <div className="material_container" onClick={itemClickHandler}>
        <p className="name">{name}</p>
        <p className="size">{size}</p>
      </div>
    </>
  );
};

export default ResourceItem;
