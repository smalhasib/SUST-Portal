// External Imports.....
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
require("dotenv").config();

// DataBase Connection.........
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is Connected Successfully....."))
  .catch((err) => console.log("Database is not connnected...."));

//Routes
const UserRouter = require("./routes/UserRoutes");
const PostRouter = require("./routes/PostRoutes");
const ResourceRouter = require("./routes/ResourceRoutes");
const BlogRoutes = require("./routes/BlogPostRoute");

app.use("/", UserRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/post", PostRouter);
app.use("/resources", ResourceRouter);
app.use("/blog", BlogRoutes);

// Server is listening here.......
const PORT = "http://locahost:5000";
app.listen(5000, () => {
  console.log(`Server is listening in ${PORT}`);
});
