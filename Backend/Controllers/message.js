const { StatusCodes } = require("http-status-codes")
const messageTable = require("../models/messageModel")
const conversation = require("../models/convModule")

const messages=async(req,res)=>{
try {
    const{message}=req.body
    const{id:reciver_id}=req.params
    const sender_id=req.user._id//from the middleware function
    console.log(sender_id)

let connversion=await conversation.findOne({
    participants:{$all:[reciver_id,sender_id]}
})
if(!connversion){
    connversion=await conversation.create({
        participants:[reciver_id,sender_id]
    })
}



     const newmessage=new messageTable({
        sender:reciver_id,
      receiver:sender_id,
        message:message
     })
     if(newmessage){
         connversion.message.push(newmessage)
        }
        await newmessage.save()
    await connversion.save()


    return res.status(StatusCodes.CREATED).json(newmessage)

} catch (error) {
    console.error(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).msg({'internal server error': error})
}
}


module.exports=messages