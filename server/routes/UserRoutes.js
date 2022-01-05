const express = require('express')
const route = express.Router()
const { upload } = require("../helpers/filehelper");
const {
  Login,
  Registration,
  Verification,
  ResendCode,
  AboutVerification,
  UpdateProfile,
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

//uploading profile picture
route.post("/updateProfile", upload.single("file"), UpdateProfile);

module.exports = route
