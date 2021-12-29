const express = require("express");
const route = express.Router();
const { upload } = require("../helpers/filehelper");
const Resource = require("../models/ResourceSchema");

route.post("/upload", upload.single("file"), async (req, res, next) => {
  const { department, courseName, courseCode, year } = req.body;

  try {
    const resource = new Resource({
      department: department,
      courseName: courseName,
      courseCode: courseCode,
      fileName: `${courseCode.toLowerCase()}-${year}.pdf`,
      filePath: req.file.path,
      fileSize: fileSizeFormatter(req.file.size, 2),
      year: year,
    });

    await resource.save();
    res.status(201).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

route.get("/fetch", async (req, res) => {
  Resource.find({ department: req.query.dept })
    .then((resource) => {
      res.json(resource);
    })
    .catch((err) => console.log(err));
});

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = route;
