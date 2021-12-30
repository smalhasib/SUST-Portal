const fileSizeFormatter = require("../Utils/Utility");
const Post = require("../models/PostSchema");

const PostWithImage = async (req, res, next) => {
  try {
    console.log(req.body);
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
    const post = new Post({
      name: req.body.name,
      department: req.body.department,
      title: req.body.title,
      description: req.body.description,
      files: filesArray,
    });
    await post.save();
    res.status(201).send("Post Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const GetPosts = async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  PostWithImage,
  GetPosts
};