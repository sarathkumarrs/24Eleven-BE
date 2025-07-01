const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/24ElevenTest');
    console.log('Connected to DB!');
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = connectDB;