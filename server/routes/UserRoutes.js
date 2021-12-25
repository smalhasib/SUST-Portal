const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')
const nodemailer = require('nodemailer')



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
                // res.status(200).json({ message: "User Login Successfull.." })
                res.status(200).json({ token: token })
            } else {
                res.status(400).json({ error: "Login Failed." })
            }
        } else {
            res.status(400).json({ error: "Invalid Email" })
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
        sentVerifiedMail(user.email)
        res.status(201).json({ message: "User Register Succesfull.." })
    } catch (err) {
        console.log(err)
    }

})
const sentVerifiedMail = (email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verify your account',
        text: 'Verification code is 12345'
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });

}

// About page ....
route.post('/about', async(req, res) => {
    try {
        const { token } = req.body
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
        req.rootUser = rootUser
        res.status(200).json(req.rootUser)
        console.log("User authenticate")
    } catch (error) {
        res.status(401).send("No token provided.")
        console.log(error)
    }

})

module.exports = route