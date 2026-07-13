import mongoose from "mongoose";
import appConfig from "./app.config.js";

export async function connectDatabase() {
  try {
    console.log("==================================");
    console.log("Mongo URI:", appConfig.mongodbUri);
    console.log("==================================");

    await mongoose.connect(appConfig.mongodbUri);

    console.log("✅ MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Failed");
    console.error(error);
    process.exit(1);
  }
}