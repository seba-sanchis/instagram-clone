// Imports
import express from "express";

import { getPost, getPosts, createPost, updatePost, likePost, commentPost, deletePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

// Initializing router
const router = express.Router();

// Routes
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;