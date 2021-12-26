import React, { useState } from "react";
import Header from "../Header/Header";
import CourseItem from "./CourseItem";
import Dropdown from "./Dropdown";
import "./Resources.css";
import { COURSES, DEPARTMENT } from "../../data";
import UploadDialog from "./UploadDialog";

const Resources = () => {
  const [selected, setSelected] = useState("Choose a department");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedShort = DEPARTMENT.filter((dept) => dept.name === selected)
    .flatMap((dept) => dept.short)
    .toString();

  const dialogBoxHandler = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <>
      <Header />
      <div
        className="resource_container"
        style={{
          backgroundImage: `url("/img/archive.png")`,
        }}
      >
        <UploadDialog open={isDialogOpen} onClose={dialogBoxHandler}/>

        <div className="resource_header">
          <div className="resource_text">
            <p>SUST EDUCATIONAL ARCHIVE</p>
          </div>
          <div className="resource_option">
            <Dropdown selected={selected} setSelected={setSelected} />
            <button onClick={dialogBoxHandler}>Upload Resource</button>
          </div>
        </div>
        <div className="resource_item">
          {COURSES.filter((data) => data.id.toString() === selectedShort)
            .flatMap((courses) => courses.courses)
            .map((course) => (
              <CourseItem key={course.id} name={course.name} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Resources;
