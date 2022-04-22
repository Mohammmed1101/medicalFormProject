const express = require('express');
const app = express()
const mongoose = require('mongoose');
var cors = require('cors');

const posts = require("./routes/posts")
const users = require("./routes/users")
const drugs = require("./routes/drug");
const { string, required, exist } = require('joi');
const conversation = require("./routes/conversation")

//connecting the DB
mongoose.connect('mongodb://localhost:27017/MyMediForm')
.then(() => console.log("connection"))
.catch(err => console.log("fail connection" + err))

app.use(express.json());
app.use(cors())
app.use("/MyMediForm/auth", users)
app.use("/MyMediForm/posts", posts)
app.use("/MyMediForm/drug", drugs)
app.use("/MyMediForm/conversation", conversation)


//////////////////////////////




   
///////////////////////////////////////

// app.use("/images", express.static(path.join(__dirname, "public/images")));

// //middleware
// app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });
//
// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

//server
const port = 5000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

/*const admin =require('./model/admin');
const comment=require('./model/comment');
const Conversation=require('./model/conversation');
const drug =require('./model/drugs');
const likes=require('./model/like-dislike');
const post =require('./model/post');
const rate=require('./model/rate');
const SpecialistLicense=require('./model/SpecialistLicense');
const user =require('./model/user');
*/
