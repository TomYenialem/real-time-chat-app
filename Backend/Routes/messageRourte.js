const express=require('express')
const auth = require('../middleware/auth')
const messages = require('../Controllers/message')
const messageRoute=express.Router()



messageRoute.post('/sentmesaage/:id',auth,messages)


module.exports=messageRoute