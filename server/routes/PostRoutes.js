const express = require('express')
const route = express.Router()
const { upload } = require('../helpers/filehelper');
const {
    PostUpload,
    PostGet
} = require('../controllers/PostUploadController');

route.post('/post', upload.array('files'), PostUpload);
route.get('/postget', PostGet);

module.exports = route
