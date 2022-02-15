// Imports

import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

// Component

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div><img src={post.selectedFile} /></div>
      <div>{post.title}</div>
      <div>{post.creator}</div>
      <div>{moment(post.createdAt).fromNow()}</div>
      <div>
          <button onClick={() => setCurrentId(post._id)}>Edit</button>
      </div>
      <div>{post.tags.map((tag) => `#${tag} `)}</div>
      <div>{post.title}</div>
      <div>{post.message}</div>
      <button onClick={() => dispatch(likePost(post._id))}> Like {post.likeCount} </button>
      <button onClick={() => dispatch(deletePost(post._id))}> Delete </button>
    </div>
  );
};

export default Post;
