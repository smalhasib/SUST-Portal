import React, { useState } from "react";
import "./UploadDialog.css";
import { DEPARTMENT, COURSES } from "../../data";
import Select from "react-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";

const UploadDialog = ({ open, onClose }) => {
  const [resource, setResource] = useState({
    department: "",
    cousreName: "",
    courseCode: "",
    file: [],
    year: "",
  });
  const [courses, setCourses] = useState([]);

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
    setResource({
      ...resource,
      department: selected.value,
    });
  };

  const courseSelectHandler = (selected) => {
    setResource({
      ...resource,
      courseCode: selected.value,
      cousreName: selected.label,
    });
  };

  const yearSelectHandler = (date) => {
    setResource({
      ...resource,
      year: new Date(date._d).getFullYear(),
    });
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);

    setResource({
      ...resource,
      file: {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
      },
    });
  };

  const submitHandler = () => {
    console.log(resource);
    axios
      .post("http://localhost:5000/resources/post", resource)
      .then((res) => {
        alert(res.data.massage);
      })
      .catch((err) => alert(err));
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
            closeOnSelect={true}
          />
          <div className="dialog_file">
            <label htmlFor="avatar">Select PDF file</label>
            <input
              type="file"
              id="avatar"
              accept=".pdf"
              onChange={fileSelectedHandler}
            />
          </div>
        </div>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </>
  );
};

export default UploadDialog;
