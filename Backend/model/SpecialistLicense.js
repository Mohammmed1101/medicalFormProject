const mongoose= require('mongoose');
const Joi = require("joi");
const SpecialistLicenseSchema = new mongoose.Schema({
    Licensenumber: Number,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
})

const  SpecialistJoi= (input) => Joi.object({
    Licensenumber:Joi.number()
}).validate(input)

const SpecialistLicense  = mongoose.model("specialistLicense", SpecialistLicenseSchema )
module.exports.SpecialistLicense =SpecialistLicense
module.exports.SpecialistJoi  = SpecialistJoi


