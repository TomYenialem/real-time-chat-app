const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name:{
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilepic: {
    type: String,
    default: "",
  },
});
const User = mongoose.model("User", userschema);

module.exports = User;

