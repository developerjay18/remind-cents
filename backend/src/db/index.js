import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conncetionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      "MONGODB CONNECTION ESTABLISHED",
      conncetionInstance.connection.host
    );
  } catch (error) {
    console.log("ERROR AT CONNECTING MONGODB USING CONNECTDB FUNC..", error);
    process.exit(1);
  }
};

export default connectDB;
