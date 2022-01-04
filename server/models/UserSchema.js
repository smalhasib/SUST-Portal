const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

//Hashing password........
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

// Generating token....
userSchema.methods.generateAuthToken = async function (User) {
  try {
    let token = jwt.sign(
      { _id: this.id, name: this.name, department: this.department },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("User", userSchema);
