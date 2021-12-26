import React, { useState } from "react";
import "./UploadDialog.css";
import { DEPARTMENT, COURSES } from "../../data";
import Select from "react-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const UploadDialog = ({ open, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [selectedYear, setSelectedYear] = useState();

  const dept = DEPARTMENT.map((dept) => ({
    value: dept.short,
    label: dept.name,
  }));

  if (!open) return null;

  const deptSelectHandler = (selected) => {
    setCourses(
      COURSES.filter((data) => data.id.toString() === selected.value.toString())
        .flatMap((course) => course.courses)
        .map((course) => ({
          value: course.code,
          label: course.name,
        }))
    );
  };

  const courseSelectHandler = (value) => {
    console.log(value);
  };

  const yearSelectHandler = (date) => {
    setSelectedYear(date);
  };

  const submitHandler = () => {
    onClose();
  };

  return (
    <>
      <div className="dialog_overlay" onClick={onClose} />
      <div className="dialog_container">
        <div className="dialog_info">
          <Select
            options={dept}
            onChange={deptSelectHandler}
            placeholder="Select Department"
          />
          <Select
            options={courses}
            onChange={courseSelectHandler}
            placeholder="Select Course"
          />
          <Datetime
            dateFormat="YYYY"
            onChange={yearSelectHandler}
            timeFormat={false}
            inputProps={{ placeholder: "Select Year" }}
          />
          <div className="dialog_file">
            <label htmlFor="avatar">Select PDF file</label>
            <input type="file" id="avatar" accept=".pdf" />
          </div>
        </div>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </>
  );
};

export default UploadDialog;
