const mongoose = require("mongoose");

const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "geekshop",
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Succesfully...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
// export default connectDb;
