// Imports

import React from "react";
import moment from "moment";

// Component

const Post = ({ post }) => {
  return (
    <div>
      <div><img src={post.selectedFile}/></div>
      <div>{post.title}</div>
      <div>{post.creator}</div>
      <div>{moment(post.createdAt).fromNow()}</div>
      <div>
          <button onClick={() => {}}></button>
      </div>
      <div>{post.tags.map((tag) => `#${tag} `)}</div>
      <div>{post.message}</div>
      <button onClick={() => {}}>Like {post.likeCount}</button>
      <button onClick={() => {}}>Delete</button>
    </div>
  );
};

export default Post;
