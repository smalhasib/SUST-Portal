const fileSizeFormatter = require("../Utils/Utility");
const Resource = require("../models/ResourceSchema");

const PostResourceWithPdf = async (req, res, next) => {
  const { department, courseName, courseCode, year } = req.body;

  try {
    const resource = new Resource({
      department: department,
      courseName: courseName,
      courseCode: courseCode,
      fileName: `${courseCode.toLowerCase()}-${year}.pdf`,
      filePath: req.file.path,
      fileSize: fileSizeFormatter(req.file.size, 2),
      year: year,
    });

    await resource.save();
    res.status(201).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
};

const GetResources = async (req, res) => {
  Resource.find({ department: req.query.dept })
    .then((resource) => {
      res.json(resource);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  PostResourceWithPdf,
  GetResources,
};
