// Imports
import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

// Component
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
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
      <button disabled={!user?.result} onClick={handleLike}>
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
