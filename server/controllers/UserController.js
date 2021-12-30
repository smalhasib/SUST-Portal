const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const VerifyUser = require("../models/VerifyUserSchema");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please input your Email and Password." });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      var token = await userLogin.generateAuthToken(User);
      if (isMatch) {
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: "Login Failed." });
      }
    } else {
      res.status(400).json({ error: "Invalid Email" });
    }
  } catch (err) {
    console.log(err);
  }
};

const Registration = async (req, res) => {
  const { name, department, registration, email, password } = req.body;
  if (!name || !department || !registration || !email || !password) {
    return res.status(422).json({
      error: "Please fill all the information ",
    });
  }
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(422).json({ error: "User already exist." });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const verify = new VerifyUser({
      name,
      department,
      registration,
      email,
      password,
      code,
    });
    await verify.save();

    sentVerifiedMail(verify.email, code);

    res.status(201).json({ message: "User Register Succesfull.." });
  } catch (err) {
    console.log(err);
  }
};

const Verification = async (req, res) => {
  const { code } = req.body;

  await VerifyUser.findOne({
    code: code,
  })
    .then((verify) => {
      const user = new User({
        name: verify.name,
        department: verify.department,
        registration: verify.registration,
        email: verify.email,
        password: verify.password,
      });
      user.save();

      VerifyUser.deleteOne({ code: code })
        .then((verify) => console.log("Temporary user deleted"))
        .catch((err) => console.log(err));

      res.status(200).send("User verified");
    })
    .catch((err) => {
      res.status(401).send("Wrong code.");
      console.error(err);
    });
};

const ResendCode = async (req, res) => {
  const { email } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await VerifyUser.updateOne(
    {
      email: email,
    },
    {
      $set: {
        code: code,
      },
    }
  )
    .then((result) => {
      sentVerifiedMail(email, code);
      res.status(200).send("Resent verification code.");
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
};

const AboutVerification = async (req, res) => {
  try {
    const token = req.query.profileToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    await User.findOne({
      _id: verifyToken._id,
    }).then((user) => res.status(200).json(user));
    console.log("User authenticate");
  } catch (error) {
    res.status(401).send("No token provided.");
    console.log(error);
  }
};

const sentVerifiedMail = async (email, code) => {
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
        service: "gmail",
        auth: {
          type: "OAuth2",
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
        subject: "Verification Code",
        text: "Verificaiton code is  " + code,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }

  sendMail()
    .then((result) => console.log("Email sent...", result))
    .catch((error) => console.log(error.message));
};

module.exports = {
  Login,
  Registration,
  Verification,
  ResendCode,
  AboutVerification,
};
