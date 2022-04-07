const { Schema, model } = require("mongoose");
const mongoose= require('mongoose');
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  comment :String ,
   Drugid: {
        type: mongoose.Types.ObjectId,
        ref: "drugs"
    },
     owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    dislikes: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
     Date : {
        type : Date , 
        default : Date.now
    }
})

const commentJoi= (input) => Joi.object({
    comment: Joi.string().min(1).max(200).required(),
}).validate(input)

const Comment = mongoose.model("comment", commentSchema)
module.exports.Comment = Comment
module.exports.commentJoi  = commentJoi
