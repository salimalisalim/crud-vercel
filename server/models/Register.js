const mongoose = require('mongoose')

//create schema for model

const RegisterSchema = new mongoose.Schema({            // RegisterSchema => schema name for model
    
    childName:String,
    email:String,
    password:String

})  

//create model

const RegisterModel = mongoose.model('register',RegisterSchema)

module.exports = RegisterModel;