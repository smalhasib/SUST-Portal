import React, { useState } from "react";
import "./UploadDialog.css";
import { DEPARTMENT, COURSES } from "../../data";
import Select from "react-select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";

const UploadDialog = ({ open, onClose }) => {
  const [resourceInfo, setResourceInfo] = useState({
    department: "",
    courseName: "",
    courseCode: "",
    year: "",
  });
  const [file, setFile] = useState("");
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
    setResourceInfo({
      ...resourceInfo,
      department: selected.value,
    });
  };

  const courseSelectHandler = (selected) => {
    setResourceInfo({
      ...resourceInfo,
      courseCode: selected.value,
      courseName: selected.label,
    });
  };

  const yearSelectHandler = (date) => {
    setResourceInfo({
      ...resourceInfo,
      year: new Date(date._d).getFullYear(),
    });
  };

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submitHandler = () => {
    const { department, courseName, courseCode, year } = resourceInfo;

    if (
      department === "" ||
      courseName === "" ||
      courseCode === "" ||
      year === "" ||
      file === ""
    ) {
      alert("All fields are required for submitting resource.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("department", resourceInfo.department);
    formData.append("courseName", resourceInfo.courseName);
    formData.append("courseCode", resourceInfo.courseCode);
    formData.append("year", resourceInfo.year);

    axios
      .post("http://localhost:5000/resources/upload", formData)
      .then((res) => {
        alert(res.data);
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
