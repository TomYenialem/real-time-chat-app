const express=require('express')
const signinRouter= express.Router();
const signinController=require('../Controllers/signin')




signinRouter.post("/signin",signinController);
module.exports=signinRouter