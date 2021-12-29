const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: String,
  department: String,
  registration: String,
  email: String,
  password: String,
  tokens: [
    {
      token: String,
    },
  ],
});
//Hashing password........
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

// Generating token....
userSchema.methods.generateAuthToken = async function(User) {
    try {
        let token = jwt.sign({_id:this.id, name:this.name, department:this.department}, process.env.SECRET_KEY,{
            expiresIn: '7d',
        })
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }
}

const User = new mongoose.model("User", userSchema);
module.exports = User;
