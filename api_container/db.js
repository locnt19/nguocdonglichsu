const mongoose = require("mongoose");

async function connectDB(mongoURL) {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
