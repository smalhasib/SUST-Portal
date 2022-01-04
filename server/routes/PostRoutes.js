const express = require("express");
const route = express.Router();
const { upload } = require("../helpers/filehelper");
const {
  PostWithImage,
  GetPosts,
  PostComment,
} = require("../controllers/PostController");

route.post("/post", upload.array("files"), PostWithImage);
route.get("/fetch", GetPosts);
route.post("/comment", PostComment);

module.exports = route;
