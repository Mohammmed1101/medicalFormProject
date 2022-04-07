const { Schema, model } = require("mongoose");
const mongoose= require('mongoose');
const Joi = require("joi")


const conversationSchema = new mongoose.Schema({
    sender_id : {
        type :mongoose.Types.ObjectId,
        ref : "user"
    },
    message : String ,
    receive_id : {
        type :mongoose.Types.ObjectId,
        ref : "user"
    },
    Date : {
        type : Date , 
        default : Date.now
    }

})

const conversationJoi = Joi.object({
    message : Joi.string().max(1000).required(),

})

const Conversation = mongoose.model("Conversation" , conversationSchema)
module.exports.Conversation = Conversation
module.exports.conversationJoi = conversationJoi