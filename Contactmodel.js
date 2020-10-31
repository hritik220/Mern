const mongoose = require('mongoose')

let schema = mongoose.Schema

let contactmodel = new schema({
     _id : mongoose.Schema.Types.ObjectId,
     name : String,
     email : String,
     contact : Number,
     address : String
})

let contactcmodel = mongoose.model('contactlist',contactmodel)

module.exports = contactcmodel;