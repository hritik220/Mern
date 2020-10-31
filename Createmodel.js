const mongoose = require('mongoose')

let schema = mongoose.Schema

let userauthenticationschema = new schema({
   _id : mongoose.Schema.Types.ObjectId,
   Username : String,
   Password : String
})

let usermodel = mongoose.model('authent',userauthenticationschema)
module.exports = usermodel