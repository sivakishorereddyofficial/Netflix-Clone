import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

export const generateTokenAndSetCookie = (accountId, response) => {
  // Generate a JWT with the account ID as payload
  const authToken = jwt.sign({ accountId }, CONFIG.TOKEN_SECRET, { expiresIn: "15d" });

  // Set the cookie with security options
  response.cookie("auth-token", authToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevent access via JavaScript to mitigate XSS attacks
    sameSite: "strict", // Protect against CSRF attacks
    secure: CONFIG.ENVIRONMENT !== "development", // Ensure secure transmission in production
  });

  return authToken; // Return the token for further use if needed
};
