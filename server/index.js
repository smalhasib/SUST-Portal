// External Imports.....
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const config = require("./config");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.set('view engine', 'ejs')
require("dotenv").config();

// DataBase Connection.........
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is Connected Successfully....."))
  .catch((err) => console.log("Database is not connnected...."));

// storage engine
const storage = new GridFsStorage({
  url: config.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage })

//Routes
const UserRouter = require("./routes/UserRoutes");
const PostRouter = require("./routes/PostRoutes");
const ResourceRouter = require("./routes/ResourceRoutes");

app.use("/", UserRouter);
app.use("/post", PostRouter);
app.use("/resources", ResourceRouter(upload));

// Server is listening here.......
const PORT = "http://locahost:5000";
app.listen(5000, () => {
  console.log(`Server is listening in ${PORT}`);
});
