import React, { useState } from "react";
import "./Dropdown.css";
import { DEPARTMENT } from "../../data";
import { Scrollbars } from "react-custom-scrollbars";

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  const dropdownButtonClickHandler = (event) => {
    setIsActive(!isActive);
  };

  const dropdownItemCLickHandler = (event) => {
    setSelected(event.target.textContent);
    setIsActive(false);
  };

  return (
    <>
      <div className="dropdown">
        <div className="dropdown-btn" onClick={dropdownButtonClickHandler}>
          {selected}
          <span className={isActive ? "fas fa-sort-up" : "fas fa-caret-down"}></span>
        </div>
        {isActive && (
          <div className="dropdown-content">
            <Scrollbars autoHeight autoHeightMax={200} autoHeightMin={200}>
              {DEPARTMENT.map((dept) => (
                <div
                  key={dept.id}
                  className="dropdown-item"
                  onClick={dropdownItemCLickHandler}
                >
                  {dept.name}
                </div>
              ))}
            </Scrollbars>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
