import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DB_NAME,
    };
    await mongoose.connect(process.env.DB_URL, DB_OPTIONS);
  } catch (error) {
    res.status.send({ message: "Something went wrong or may be server issue" });
  }
};
export default connectDB;
