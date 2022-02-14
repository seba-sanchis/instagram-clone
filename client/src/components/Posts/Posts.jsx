// Imports

import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

// Component

const Posts = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
