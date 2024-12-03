const { StatusCodes } = require("http-status-codes")

const logout=(req,res)=>{
try {
    
//  res.cookie('jwt-token','',{maxAge:0})
//    res.clearCookie("jwt-token", {maxAge:0})
   res.clearCookie("jwt_token", { maxAge: 0, path: "/" });

res.status(StatusCodes.ACCEPTED).json({msg:'succesflluy logout'})
} catch (error) {
    console.log(error)
    res.status(StatusCodes.BAD_REQUEST).json({msg:'internal server error'})

}
}

module.exports = logout;