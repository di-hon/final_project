const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect to database succesfully");
  } catch (error) {
    console.log("Failed to connect to databsase");
  }
};

module.exports = dbConnect;
