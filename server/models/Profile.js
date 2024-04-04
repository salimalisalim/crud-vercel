const mongoose = require('mongoose')

//create schema for model

const ProfileSchema = new mongoose.Schema                // ProfileSchema => schema name for model

({            
    
    childname: String,
    dob : String,
    gender: String,
    guardianName: String,
    relationship: String,
    emergencyContactInfo: String,
    addressLine1: String,
    addressLine2: String, 
    addressLine3: String,
    pickupPersonName: String,
    pickupPersonContactInfo: String,
    joiningFrom: String,
    joiningTo: String,
    medicalConsent: String

})  

//create model

const ProfileModel = mongoose.model('profile',ProfileSchema)

module.exports = ProfileModel;