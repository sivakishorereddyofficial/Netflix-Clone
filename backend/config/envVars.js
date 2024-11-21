import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Export configuration object
export const CONFIG = {
  DATABASE_URL: process.env.MONGO_URI,
  APP_PORT: process.env.PORT || 5000,
  TOKEN_SECRET: process.env.JWT_SECRET,
  ENVIRONMENT: process.env.NODE_ENV,
  TMDB_KEY: process.env.TMDB_API_KEY,
};
