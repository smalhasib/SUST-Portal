import React, { useState } from "react";
import Header from "../Header/Header";
import CourseItem from "./CourseItem";
import Dropdown from "./Dropdown";
import "./Resources.css";
import { COURSES, DEPARTMENT } from "../../data";
import UploadDialog from "./UploadDialog";
import axios from "axios";

const Resources = () => {
  const [selected, setSelected] = useState("Choose a department");
  const [deptShort, setDeptShort] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resources, setResources] = useState([]);

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
        <div className="resource_item">
          {resources.length !== 0 &&
            COURSES.filter((data) => data.id.toString() === deptShort)
              .flatMap((courses) => courses.courses)
              .map((course) => (
                <CourseItem
                  key={course.id}
                  name={course.name}
                  data={resources.filter(
                    (data) =>
                      course.code.toString() === data.courseCode.toString()
                  )}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Resources;
