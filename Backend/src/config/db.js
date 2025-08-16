import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_CONNECTION_STRING } = process.env;

mongoose
  .connect(DB_CONNECTION_STRING, {
    autoIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e.message);
    process.exit(1);
  });
