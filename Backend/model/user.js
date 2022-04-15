const mongoose= require('mongoose');
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity");


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    avatar : {
     type :   String,
    },
    gender :String,
    username : String , 
    email:String , 
    emailVerified : {
        type  : Boolean , 
        default : false,
    }, 
    password:String,
    company_No : Number,
    companyName : String,
    SpecialistLicense:{
        type: mongoose.Types.ObjectId,
        ref: "SpecialistLicense"
    },
    role : {
        type : String,
        default : "Consumer",
        enum :["Admin","Consumer","Specialist","Company","DRA"]
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "comment"
    }],
    post: [{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }],
}) 
const signupJoi= (input) => Joi.object({
    firstName : Joi.string().regex(/^[a-zA-Z]+$/).alphanum().min(3).max(50).required(),
    lastName : Joi.string().regex(/^[a-zA-Z]+$/).alphanum().min(3).max(50).required(),
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(25).required(),
    email: Joi.string().email().required(),
    gender : Joi.string().regex(/^[a-zA-Z]+$/).alphanum().min(3).max(50).required(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      })
}).validate(input)

const CompanyJoi= (input) => Joi.object({
    companyName : Joi.string().min(3).max(50).required().allow(""),
    company_No :Joi.number().required(),
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(9).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      })
}).validate(input)
const editCompanyJoi= (input) => Joi.object({
    companyName : Joi.string().min(3).max(50),
    company_No : Joi.number().required(),
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(9),
    email: Joi.string().email(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      })
}).validate(input)

const loginJoi =  (input) => Joi.object({
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(25),
    email: Joi.string().email(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      })
}).validate(input)

const resetPassJoi= (input) => Joi.object({
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(25),
    email: Joi.string().email(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      })
}).validate(input)

const profileJoi= (input) => Joi.object({
    firstName : Joi.string().alphanum().min(3).max(50),
    lastName : Joi.string().alphanum().min(3).max(50),
    avatar : Joi.string().uri().max(1000),
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(25),
    email: Joi.string().email(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 1,
      })
}).validate(input)

const signupDRAJoi= (input) => Joi.object({
    firstName : Joi.string().regex(/^[a-zA-Z]+$/).alphanum().min(3).max(50).required(),
    username : Joi.string().regex(/^[a-zA-Z0-9._]+$/).min(4).max(25).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity({
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
      })
}).validate(input)
const User = mongoose.model("user", userSchema)

module.exports.User = User
module.exports.signupJoi = signupJoi
module.exports.signupDRAJoi = signupDRAJoi
module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
module.exports.resetPassJoi = resetPassJoi
module.exports.CompanyJoi = CompanyJoi
module.exports.editCompanyJoi = editCompanyJoi