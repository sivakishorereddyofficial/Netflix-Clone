import express from "express";
import cookies from "cookie-parser";
import { resolve, join } from "path";

import authRouter from "./routes/auth.route.js";
import moviesRouter from "./routes/movie.route.js";
import showsRouter from "./routes/tv.route.js";
import searchRouter from "./routes/search.route.js";

import { CONFIG } from "./config/envVars.js";
import { initializeDatabase } from "./config/db.js";
import { authorizeRequest } from "./middleware/protectRoute.js";

// Application setup
const server = express();
const APP_PORT = CONFIG.PORT;
const rootDirectory = resolve();

// Middleware for parsing
server.use(express.json());
server.use(cookies());

// API Endpoints
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/movies", authorizeRequest, moviesRouter);
server.use("/api/v1/shows", authorizeRequest, showsRouter);
server.use("/api/v1/search", authorizeRequest, searchRouter);

// Frontend setup in production
if (CONFIG.NODE_ENV === "production") {
  server.use(express.static(join(rootDirectory, "/frontend/dist")));

  server.get("*", (_, response) => {
    response.sendFile(resolve(rootDirectory, "frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(APP_PORT, async () => {
  console.log(`Application is running on http://localhost:${APP_PORT}`);
  await initializeDatabase();
});
