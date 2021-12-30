const express = require("express");
const { upload } = require("../helpers/filehelper");
const router = express.Router();
const {
  PostBlogWithImage,
  GetBlogPosts,
} = require("../controllers/BlogPostController");

router.post("/post", upload.array("files"), PostBlogWithImage);
router.get("/fetch", GetBlogPosts);

module.exports = router;
