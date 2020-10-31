const express = require('express')
const mongoose = require('../model/connection')
const router = express.Router()
const formodel = require('../model/Createmodel')
const createformmodel = require('../model/Contactmodel')

router.get('/', (req, res, next) => {
     formodel.find({}, {}, (err, doc) => {
          if (err) {
               throw err
          } else {
               res.json(doc)
          }
     })
})

// router.post('/',(req,res,next)=>{
//     let username = req.body.username
//     let password = req.body.password

//     let usercreated = new formodel({
//          _id : new mongoose.Types.ObjectId,
//          Username : username,
//          Password : password
//     })

//      usercreated.save((err,info)=>{
//         if (err) {
//              throw err;
//         } else {
//              res.json(info)
//         }
//      })
// })

router.post('/form', (req, res, next) => {
     let name = req.body.name
     let email = req.body.email
     let contact = req.body.contact
     let address = req.body.address

     let createformstructure = new createformmodel({
          _id: new mongoose.Types.ObjectId,
          name: name,
          email: email,
          contact: contact,
          address: address
     })

     createformstructure.save((err, doc) => {
          if (err) {
               throw err;
          } else {
               res.json(doc)
          }
     })
})

router.get('/findvalue/:page?',async(req,res,next)=>{
     let count = await createformmodel.find({}).count()
      let perpage = 3
      let page = req.params.page || 1
      createformmodel.find({}).skip((perpage*page)-perpage).limit(perpage).exec((err,doc)=>{
             if (err) {
                  throw err;
             } else {
                 
                 res.json({
                      data : doc,
                      count:count
                 })
             }
      })
//     createformmodel.find({},{},(err,doc)=>{
//          if (err) {
//               throw err;
//          } else {
//              res.json(doc)
//          }
//     })
})

router.delete('/remove/:id',(req,res,next)=>{
     createformmodel.findByIdAndDelete({_id:req.params.id},(err,doc)=>{
         if (err) {
                throw err;
         } else {
          createformmodel.find({},{},(err,info)=>{
               if (err) {
                    throw err;
               } else {
                   res.json(info) 
               }
          }) 
         }
     })
})

router.get('/pert/:id',(req,res,next)=>{
     createformmodel.findOne({_id:req.params.id},(err,doc)=>{
                 if (err) {
                      throw err;
                 } else {
                      res.json(doc)
                 }
     })
})

router.put('/upd/:id',(req,res,next)=>{
    createformmodel.findByIdAndUpdate({_id:req.params.id},{$set:{
     name: req.body.name,
     email: req.body.email,
     contact: req.body.contact,
     address: req.body.address  
    }},(err,doc)=>{
        if (err) {
              throw err
        } else {
          createformmodel.find({},{},(err,info)=>{
               if (err) {
                    throw err;
               } else {
                   res.json(info) 
               }
          }) 
        }
    })
})

module.exports = router;