const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to the BBDD ⚡️");
  } catch (error) {
    console.log("Connection failure with the BBDD 😔");
  }
};

module.exports = { connectDB };
