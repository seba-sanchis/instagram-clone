// Imports
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

// Component
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return <>Like</>;
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <div>
      <div>
        <img src={post.selectedFile} alt={post.name + "'s post picture"} />
      </div>
      <div>{post.title}</div>
      <div>{post.name}</div>
      <div>{moment(post.createdAt).fromNow()}</div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div>
          <button onClick={() => setCurrentId(post._id)}>Edit</button>
        </div>
      )}
      <div>{post.tags.map((tag) => `#${tag} `)}</div>
      <div>{post.message}</div>
      <button
        disabled={!user?.result}
        onClick={() => dispatch(likePost(post._id))}
      >
        <Likes />
      </button>
      <button onClick={openPost}>View all comments</button>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <button onClick={() => dispatch(deletePost(post._id))}> Delete </button>
      )}
    </div>
  );
};

export default Post;
