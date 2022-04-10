const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('mongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
