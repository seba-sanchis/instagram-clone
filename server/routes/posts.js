// Imports

import express from "express";

import { getPosts, createPost } from "../controllers/posts.js";

// Initializing router

const router = express.Router();

// Routes

router.get("/", getPosts);
router.post("/", createPost);

export default router;