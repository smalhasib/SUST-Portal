const Post = require('../models/PostSchema');

const PostUpload = async(req, res, next) => {
    try {
        console.log(req.body)
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
        const post = new Post({
            name : req.body.name,
            department:req.body.department,
            title : req.body.title,
            description: req.body.description,
            files: filesArray
        });
        await post.save();
        res.status(201).send('Post Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const PostGet = async(req, res, next) => {
    try {
        const post = await Post.find();
        res.status(200).send(post);
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
    PostUpload,
    PostGet
}