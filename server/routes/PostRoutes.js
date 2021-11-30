const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const Post = require('../models/PostSchema')


route.get('/showpost', (req, res) => {
    Post.find().then(post => {
        console.log(post)
        res.json(post)
    }).catch(err => console.log(err))
})
route.post("/post", (req, res) => {
    const { title, description } = req.body
    const post = new Post({
        title,
        description
    })
    post.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "Successfully Saved Post.." })
        }
    })
})
module.exports = route