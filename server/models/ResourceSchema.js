const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    department: {
        required: true,
        type: String,
    },
    courseName: {
        required: true,
        type: String,
    },
    courseCode: {
        required: true,
        type: String,
    },
    fileName: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    year: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

const Resource = new mongoose.model("Resource", ResourceSchema);

module.exports = Resource;