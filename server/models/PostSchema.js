const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    title: String,
    description: String
})

const Post = new mongoose.model("Post", PostSchema)
module.exports = Post