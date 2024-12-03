const mongoose = require('mongoose')


const conversationSchmema = new mongoose.Schema({
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messageTable",
      default:[]
    },
  ],
  participants: [
    {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      
    }]
});


const conversation=mongoose.model('Conversation',conversationSchmema)

module.exports=conversation