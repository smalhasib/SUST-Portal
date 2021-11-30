const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    department: String,
    registration: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)
module.exports = User