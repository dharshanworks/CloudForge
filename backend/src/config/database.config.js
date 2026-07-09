import mongoose from "mongoose";
import appConfig from "./app.config.js";

export async function connectDatabase() {
  try {
    await mongoose.connect(appConfig.mongodbUri);

    console.log("✅ MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
}