const express=require('express')
const auth = require('../middleware/auth')
const {messages,getMessages} = require('../Controllers/message')
const messageRoute=express.Router()




messageRoute.post('/sentmesaage/:id',auth,messages)
messageRoute.get('/getmesaage/:id',auth, getMessages)


module.exports=messageRoute