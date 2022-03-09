// Imports
import React from "react";
import { useSelector } from "react-redux";

import Post from "../Post/Post";

// Component
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    "LOADING..."
  ) : (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Posts;
