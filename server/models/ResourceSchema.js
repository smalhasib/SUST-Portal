const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
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
    filePath: {
      required: true,
      type: String,
    },
    fileSize: {
      type: String,
      required: true,
    },
    year: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", ResourceSchema);
