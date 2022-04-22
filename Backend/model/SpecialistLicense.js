const mongoose= require('mongoose');
const Joi = require("joi");
const SpecialistLicenseSchema = new mongoose.Schema({
    Licensenumber: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
})

const  SpecialistJoi= (input) => Joi.object({
    Licensenumber:Joi.string().pattern(/^[0-9]+$/).required(),
}).validate(input)

const SpecialistLicense  = mongoose.model("SpecialistLicense ", SpecialistLicenseSchema )

module.exports.SpecialistLicense =SpecialistLicense
module.exports= SpecialistLicenseSchema
module.exports.SpecialistJoi  = SpecialistJoi


