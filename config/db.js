const mongoose = require('mongoose');

async function connectDB() {
  try {
    const MONGODB_URL='mongodb+srv://safvankottayil:mongodbpassword@cluster0.bv7cs5g.mongodb.net/24Eleven?retryWrites=true&w=majority'
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to DB!');
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = connectDB;