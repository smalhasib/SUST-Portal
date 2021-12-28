const BlogPost = require('../models/BlogPost');
const BlogsUpload = async(req, res, next) => {
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const blogPost = new BlogPost({
            name : req.body.name,
            department:req.body.department,
            description: req.body.description,
            files: filesArray
        });
        await blogPost.save();
        res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBlogs = async(req, res, next) => {
    try {
        const blogs = await BlogPost.find();
        res.status(200).send(blogs);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    BlogsUpload,
    getBlogs
}