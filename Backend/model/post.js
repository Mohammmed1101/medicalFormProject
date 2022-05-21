const { Schema, model } = require("mongoose");
const mongoose= require('mongoose');
const Joi = require("joi");
const { User } = require("./user");

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
      Date : {
        type : Date , 
        default : Date.now
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
})

const postJoi = Joi.object({
    title: Joi.string().max(200).required(),
    description: Joi.string().max(10000).required(),
    image: Joi.string().uri().allow(""),
})

const Post = mongoose.model("Post", postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi