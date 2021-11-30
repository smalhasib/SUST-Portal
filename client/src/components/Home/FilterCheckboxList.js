import { React, useState } from "react";
import "./FilterCheckboxList.css";

const FilterCheckboxList = (props) => {
  const [checked, setChecked] = useState(false);

  const checkboxClickHandler = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="fl_option">
      <input type="checkbox" checked={checked} onClick={checkboxClickHandler} />{" "}
      <p> {props.text}</p>{" "}
    </div>
  );
};

export default FilterCheckboxList;
