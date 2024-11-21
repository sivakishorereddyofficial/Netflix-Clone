import express from "express";
import {
  checkAuthentication,
  handleLogin,
  handleLogout,
  handleSignup,
} from "../controllers/auth.controller.js";
import { authorize } from "../middleware/protectRoute.js";

const authRouter = express.Router();

// Authentication Routes
authRouter.post("/register", handleSignup); // Sign up endpoint
authRouter.post("/signin", handleLogin);   // Log in endpoint
authRouter.post("/signout", handleLogout); // Log out endpoint

// Authentication Check Route
authRouter.get("/check-auth", authorize, checkAuthentication);

export default authRouter;
