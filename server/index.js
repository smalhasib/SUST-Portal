// External Imports.....
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
require('dotenv').config()

// DataBase Connection.........
mongoose.connect("mongodb://localhost:27017/sustportal", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("DataBase is Connected Successfully....."))
    .catch((err) => console.log("DataBase is not connnected...."))

const UserRouter = require("./routes/UserRoutes")
const PostRouter = require("./routes/PostRoutes")
const BlogRoutes = require('./routes/BlogPostRoute');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    //Routes
app.use("/", UserRouter)
app.use("/post", PostRouter)
app.use('/api', BlogRoutes.routes);


// Server is listening here.......
const PORT = 'http://locahost:5000'
app.listen(5000, () => {
    console.log(`Server is listening in ${PORT}`)
})