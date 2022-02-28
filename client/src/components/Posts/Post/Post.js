// Imports
import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";
import "./Post.scss";

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
    <div className="post">
      <header className="post-header">
        <div className="post-user">{post.name}</div>
      </header>
        <button className="post-menu">
          <svg className="post-icon" role="img" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </button>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div>
          <button onClick={() => setCurrentId(post._id)}>Edit</button>
          <button onClick={() => dispatch(deletePost(post._id))}> Delete </button>
        </div>
      )}
      <div>
        <img className="post-img" src={post.selectedFile} alt={post.name + "'s post picture"} />
      </div>
      <div>{post.title}</div>
      <div>{moment(post.createdAt).fromNow()}</div>
      <button disabled={!user?.result} onClick={handleLike}>
        <Likes />
      </button>
      <div>{post.message}</div>
      <div>{post.tags.map((tag) => `#${tag} `)}</div>
      <button onClick={openPost}>View all comments</button>
    </div>
  );
};

export default Post;
