const mongoose= require('mongoose');
const Joi = require("joi")


const ratingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    rating: Number,
  });
const drugSchema = new mongoose.Schema({
    Name: String,
    RegisterNo:Number,
    description: String,
    termOfUse: String,
    image: String,
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "comment"
    }],
    rating: [ratingSchema],
    ratingAverage :{
      type : Number , 
      default : 0, 
    }
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
const rateJoi =(input) => Joi.object({
      rate: Joi.number().min(1).max(5).required(),
    }).validate(input)


const drug = mongoose.model("drug", drugSchema)
module.exports.rateJoi = rateJoi
module.exports.drug = drug
module.exports.drugJoi = drugJoi
module.exports.editJoi = editJoi
