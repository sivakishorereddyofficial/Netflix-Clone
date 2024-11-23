import mongoose from "mongoose";
import { CONFIG } from "./config.js";

export const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(CONFIG.DATABASE_URL);
    console.log("Database connected successfully: " + connection.connection.host);
  } catch (err) {
    console.error("Failed to connect to the database: " + err.message);
    process.exit(1); // Exit with failure code
  }
};
