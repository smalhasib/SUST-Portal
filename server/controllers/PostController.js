const fileSizeFormatter = require("../Utils/Utility");
const Post = require("../models/PostSchema");
const Comment = require("../models/CommentSchema");
const ObjectId = require("mongodb").ObjectId;

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

const PostComment = async (req, res, next) => {
  const { postId, userId, comment } = req.body;

  const newComment = new Comment({
    user: ObjectId(userId),
    text: comment,
  });

  await newComment.save();

  await Post.updateOne(
    { _id: ObjectId(postId) },
    {
      $push: {
        comments: newComment._id,
      },
    }
  )
    .then((result) => res.status(201).send("Comment added"))
    .catch((err) => res.send(400).send(err.message));
};

const GetComments = async (req, res) => {
  const { postId } = req.body;

  Post.findOne({ _id: ObjectId(postId) })
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, post) => {
      post.comments.map((comment) => console.log(comment));
    });
};

module.exports = {
  PostWithImage,
  GetPosts,
  PostComment,
  GetComments,
};
