// Imports
import express from "express";

import { signin, signup } from "../controllers/user.js";

// Initializing router
const router = express.Router();

// Routes
router.post("/signin", signin);
router.post("/signup", signup);

export default router;