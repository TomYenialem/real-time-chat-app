const { StatusCodes } = require("http-status-codes");
const messageTable = require("../models/messageModel");
const Conversation = require("../models/convModule");

const messages = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciver_id } = req.params;
    const sender_id = req.user._id; //from the middleware function
    console.log(sender_id);

    let connversion = await Conversation.findOne({
      participants: { $all: [reciver_id, sender_id] }
    }).populate("message");
    if (!connversion) {
      connversion = await Conversation.create({
        participants: [reciver_id, sender_id],
      });
    }

    const newmessage = new messageTable({
      sender: reciver_id,
      receiver: sender_id,
      message: message,
    });
    if (newmessage) {
      connversion.message.push(newmessage._id);
    }
    await newmessage.save();
    await connversion.save();

    return res.status(StatusCodes.CREATED).json(newmessage);
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ "internal server error": error });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const sender = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [id, sender] },
    }).populate("message");
    res.status(StatusCodes.ACCEPTED).json(conversation.message);
    if(!conversation){
        res.status(StatusCodes.ACCEPTED).json([])
    }
  } catch (error) {
   console.log(error);
   res.status(StatusCodes.BAD_REQUEST).json({ msg: "internal server error" });
  }
};

module.exports = { messages, getMessages };
