const express = require("express");
const route = express.Router();
const { upload } = require("../helpers/filehelper");
const { PostWithImage, GetPosts } = require("../controllers/PostController");

route.post("/post", upload.array("files"), PostWithImage);
route.get("/fetch", GetPosts);

module.exports = route;
