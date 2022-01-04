const express = require('express')
const route = express.Router()
const {
  Login,
  Registration,
  Verification,
  ResendCode,
  AboutVerification,
} = require("../controllers/UserController");


// Posting login information.....
route.post("/login", Login)

// Posting Register information.......
route.post("/register", Registration)

// Posting verification code
route.post("/verify", Verification)

// Resending verification code
route.post("/resend", ResendCode)

// About page ....
route.get("/profile", AboutVerification);

module.exports = route
