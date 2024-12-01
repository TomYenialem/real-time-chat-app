const mongoose = require("mongoose");

const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_url);
    console.log("connected to mongos");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mongoDb;
