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
mongoose.connect(`mongodb+srv://abeerat52:${process.env.MONGO_PASS}@cluster0.y8l5hzw.mongodb.net/myMedForm?retryWrites=true&w=majority`)
.then(() => console.log("connection"))
.catch(err => console.log("fail connection" + err))

app.use(express.json());
app.use(cors())
app.use("/MyMediForm/auth", users)
app.use("/MyMediForm/posts", posts)
app.use("/MyMediForm/drug", drugs)
app.use("/MyMediForm/conversation", conversation)


//////////////////////////////

//server
const port = 5000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})


