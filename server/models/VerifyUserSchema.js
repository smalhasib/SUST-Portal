const mongoose = require("mongoose");

const verifyUserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  department: {
    required: true,
    type: String,
  },
  registration: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  code: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    expires: "1d",
    default: Date.now(),
  },
});

module.exports = mongoose.model("VerifyUser", verifyUserSchema);
