const express = require("express");
const route = express.Router();
const { upload } = require("../helpers/filehelper");
const {
  PostResourceWithPdf,
  GetResources,
} = require("../controllers/ResourceController");

route.post("/upload", upload.single("file"), PostResourceWithPdf);
route.get("/fetch", GetResources);

module.exports = route;
