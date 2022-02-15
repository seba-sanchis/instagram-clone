// Imports

import express from "express";

import { getPosts, createPost, updatePost, deletePost } from "../controllers/posts.js";

// Initializing router

const router = express.Router();

// Routes

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;