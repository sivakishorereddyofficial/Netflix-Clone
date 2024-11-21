import express from "express";
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controller.js";

// Create a new router instance
const router = express.Router();

// Search routes
router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

// Search history routes
router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
