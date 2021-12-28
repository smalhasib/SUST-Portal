const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    name:String,
    department:String,
    title: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    files: [Object]
},{ timestamps: true });

const Post = new mongoose.model("Post", PostSchema)
module.exports = Post