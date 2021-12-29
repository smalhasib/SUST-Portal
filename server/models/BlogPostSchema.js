const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const blogs = new Schema({
    name:String,
    department:String,
    description: {
        type: String,
        required: true
    },
    files: [Object]
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogs );