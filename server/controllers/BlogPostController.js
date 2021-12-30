const BlogPost = require("../models/BlogPostSchema");
const fileSizeFormatter = require("../Utils/Utility");

const PostBlogWithImage = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const blogPost = new BlogPost({
      name: req.body.name,
      department: req.body.department,
      description: req.body.description,
      files: filesArray,
    });
    await blogPost.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const GetBlogPosts = async (req, res, next) => {
  try {
    const blogs = await BlogPost.find();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  PostBlogWithImage,
  GetBlogPosts,
};
