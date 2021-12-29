const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


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
            var token = await userLogin.generateAuthToken(User)
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


const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLEINT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verification Code',
      text: 'Verificaiton code is 12345',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));

}


module.exports = route
