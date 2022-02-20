// Imports
import express from "express";

import { signin, signup, getUsersBySearch } from "../controllers/user.js";

// Initializing router
const router = express.Router();

// Routes
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/search", getUsersBySearch)

export default router;