const mongoose= require('mongoose');
const Joi = require("joi")


const ratingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    rate:{type: Number,
      default: 0},
  });

const drugSchema = mongoose.Schema({
    Name: String,
    RegisterNo:Number,
    description: String,
    termOfUse: String,
    image: String,
    rating: [ratingSchema],
    ratingAverage :{
     type: Number,
      default: 0
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "comment"
    }]
})

const drugJoi = Joi.object({
    Name: Joi.string().max(80).required(),
    RegisterNo: Joi.string().pattern(/^[0-9]+$/),
    description: Joi.string().max(10000).required(),
    termOfUse: Joi.string().max(7000),
    image: Joi.string().uri().allow("")
  
})
const editJoi = Joi.object({
    Name: Joi.string().max(80),
    description: Joi.string().max(1000),
    termOfUse: Joi.string().max(1000),
    image: Joi.string().uri().allow("")
})
const rateJoi =  Joi.object({
      rate: Joi.number().min(1).max(5).required(),
    })


const drug = mongoose.model("drug", drugSchema)


module.exports.drug = drug
module.exports.rateJoi = rateJoi
module.exports.drugJoi = drugJoi
module.exports.editJoi = editJoi
