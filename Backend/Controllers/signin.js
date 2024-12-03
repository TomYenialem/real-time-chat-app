const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const bycrpt = require("bcryptjs");
const createToken = require("../middleware/tooken");
const signinController = async (req, res) => {
  const { name, email, password, confirmPass, username } = req.body;
  // res.send('hello')
  if (!name || !email || !password || !confirmPass || !username) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fields must be provided" });
  }

  try {
    if (password !== confirmPass) {
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ msg: "please confirm your password" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already exists" });
    }

    const salt = await bycrpt.genSalt(10);
    const hashPass = await bycrpt.hash(password, salt);
    const ProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = new User({
      username,
      email,
      name,
      password: hashPass,
      profilepic: ProfilePic,
    });

    if (newUser) {
    //   createToken(newUser._id, res);
      await newUser.save();
      return res.status(StatusCodes.CREATED).json({
        msg: "user created successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server erorr,try again later" });
  }
};


const getUsers=async(req,res)=>{
  try{
    const users = await User.find()
    res.json(users)
  }catch(error){
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Server Error')
  }
}

module.exports = {getUsers,signinController}
