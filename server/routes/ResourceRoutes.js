const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Resource = require("../models/ResourceSchema");
const config = require("../config");
const Grid = require("gridfs-stream");

module.exports = (upload) => {
  const connect = mongoose.createConnection(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let gfs;

  connect.once("open", () => {
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection("uploads");
  });

  route.post("/post", upload.single("file"), (req, res) => {
    const { department, cousreName, courseCode, file, year } = req.body;
    console.log(req.body);
    const resource = new Resource({
      department: department,
      cousreName: cousreName,
      courseCode: courseCode,
      fileName: file.name,
      fileId: `${courseCode.toLowerCase()}-${year}`,
      year: year,
    });
    console.log(resource);

    resource.save()
      .then((resource) => {
        res.status(200).json({
          success: true,
          resource,
        });
      })
      .catch((err) => res.status(500).json(err));
  });

  return route;
};
