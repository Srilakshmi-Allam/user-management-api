const mongoose = require('mongoose');
require('dotenv').config()
const errorMessages = require ('../utils/ErrorMessages.js');


// const mongoURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_MONGO_URI, {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    //console.error(error.message);
    console.error(errorMessages.CF);
    process.exit(1);
  }
};


module.exports = connectDB;
