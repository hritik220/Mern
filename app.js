const express = require('express')
const app = express()
const blogger = require('morgan')
const bodyParser = require('body-parser')
const route = require('./controller/formlogic')
const connect = require('./model/connection')
const cors = require('cors')

let port = process.env.PORT || 8080;

app.use(blogger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/abc',route)

app.use((req,res,next)=>{
   let error = new Error("Found wrong url while fetching!")
   error.status = 404
   error.url = req.url
   next(error)
})

app.use((err,req,res,next)=>{
   let status = err.status || 500
   res.json({
       status : status,
       message : err.message,
       url : err.url
   })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})