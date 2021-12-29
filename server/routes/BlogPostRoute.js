const express = require('express');
const { upload } = require('../helpers/filehelper');
const {
    BlogsUpload,
    getBlogs
} = require('../controllers/fileuploaderController');
const router = express.Router();

router.post('/blogUpload', upload.array('files'), BlogsUpload);
router.get('/getblogs', getBlogs);


module.exports = {
    routes: router
}