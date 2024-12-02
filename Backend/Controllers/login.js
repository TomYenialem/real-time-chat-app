const { StatusCodes } = require("http-status-codes")
const bycrpt =require('bcryptjs')
const User = require("../models/userModel")
const createToken = require("../middleware/tooken")

const loginController=async(req,res)=>{

    const{email,password}=req.body
    if(!email||!password){
        res.status(StatusCodes.BAD_REQUEST).json({msg:'All fields required'})
    }
   try {
    const user=await User.findOne({email})
   
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:'user not found'})
    }

    const isMatched=await bycrpt.compare(password,user?.password)
    if(!isMatched){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid password'})
    }
     
   createToken(user._id,res)
    return res.status(StatusCodes.ACCEPTED).json({msg:'login accepted'})
    
   } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal Server Error'})
   }

}




module.exports=loginController