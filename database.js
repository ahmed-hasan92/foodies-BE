const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("MongooDB is running well");
  } catch {
    console.log("Failed connection with mongooDB ");
  }
};

module.exports = connection;
