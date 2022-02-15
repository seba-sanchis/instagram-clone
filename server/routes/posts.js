// Imports

import express from "express";

import { getPosts, createPost, updatePost } from "../controllers/posts.js";

// Initializing router

const router = express.Router();

// Routes

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;