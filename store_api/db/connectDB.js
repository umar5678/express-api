import dotenv from "dotenv";
dotenv.config();
import mongoose, { connect } from "mongoose";

const connectionString = process.env.STORE_API_DB_URI;


export const connectDB = () => {
  return mongoose.connect(`${connectionString}`, {});
};
