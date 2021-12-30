import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COURSES, DEPARTMENT } from "../../data";
import axios from "axios";
import Header from "../Header/Header";
import CourseItem from "./Items/CourseItem";
import Dropdown from "./Dropdown";
import UploadDialog from "./UploadDialog/UploadDialog";
import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Choose a department");
  const [deptShort, setDeptShort] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      navigate("/login");
    }
  });

  const getResources = async (value) => {
    await axios
      .get("http://localhost:5000/resources/fetch", {
        params: {
          dept: value,
        },
      })
      .then((response) => setResources(response.data))
      .catch((err) => alert(err));
  };

  const updateDepartment = (value) => {
    setSelected(value);

    const short = DEPARTMENT.filter(
      (deparment) => deparment.name.toString() === value.toString()
    )
      .map((dept) => dept.short)
      .toString();

    setDeptShort(short);
    getResources(short);
  };

  const dialogBoxHandler = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const courseView =
    resources.length !== 0 ? (
      COURSES.filter((data) => data.id.toString() === deptShort)
        .flatMap((courses) => courses.courses)
        .map((course) => (
          <CourseItem
            key={course.id}
            name={course.name}
            data={resources.filter(
              (data) => course.code.toString() === data.courseCode.toString()
            )}
          />
        ))
    ) : (
      <p
        style={{
          fontSize: "40px",
          marginTop: "120px",
        }}
      >
        No resouce available
      </p>
    );

  return (
    <>
      <Header />
      <div
        className="resource_container"
        style={{
          backgroundImage: `url("/img/archive.png")`,
        }}
      >
        <UploadDialog open={isDialogOpen} onClose={dialogBoxHandler} />

        <div className="resource_header">
          <div className="resource_text">
            <p>SUST EDUCATIONAL ARCHIVE</p>
          </div>
          <div className="resource_option">
            <Dropdown selected={selected} setSelected={updateDepartment} />
            <button onClick={dialogBoxHandler}>Upload Resource</button>
          </div>
        </div>
        <div className="resource_item">{courseView}</div>
      </div>
    </>
  );
};

export default Resources;
