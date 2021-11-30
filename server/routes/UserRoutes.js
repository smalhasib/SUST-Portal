const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const User = require('../models/UserSchema')


//Get Data...
route.get('/', (req, res) => {
    res.send('From USerRouter,...')
})

// Posting login information.....
route.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})


// Posting Register information.......
route.post("/register", (req, res) => {
    const { name, department, registration, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                department,
                registration,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})
module.exports = route