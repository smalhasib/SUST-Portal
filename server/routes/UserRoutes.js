const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')

// Posting login information.....
route.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Please input your Email and Password." })
        }
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
                //token generating...
            var token = await userLogin.generateAuthToken()
            if (isMatch) {
                res.status(200).json({ message: "User Login Successfull.." })
            } else {
                res.status(400).json({ error: "Login Failed." })
            }
        } else {
            res.status(200).json({ error: "Invalid Email" })
        }

    } catch (err) {
        console.log(err)
    }
})

// Posting Register information.......
route.post("/register", async(req, res) => {
    const { name, department, registration, email, password } = req.body
    if (!name || !department || !registration || !email || !password) {
        return res.status(422).json({
            error: "Please fill all the information "
        })
    }
    try {
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(422).json({ error: "User already exist." })
        }
        const user = new User({
            name,
            department,
            registration,
            email,
            password
        })
        await user.save()
        res.status(201).json({ message: "User Register Succesfull.." })
    } catch (err) {
        console.log(err)
    }

})

module.exports = route