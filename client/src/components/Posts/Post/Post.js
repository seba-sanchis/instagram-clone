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
    <article className="post">
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
      <img className="post-img" src={post.selectedFile} alt={post.name + "'s post picture"} />
      <section className="post-btns">
        <button className="post-like-btn" disabled={!user?.result} onClick={handleLike}>
         <svg className="post-like-icon" role="img" viewBox="0 0 24 24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
        </button>
        <button className="post-comment-btn">
         <svg className="post-comment-icon" role="img" viewBox="0 0 24 24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"></path></svg>
        </button>
      </section>
      <section className="post-like">
        <Likes />
      </section>
      <div className="post-messages">
        <span className="post-user">{post.name}</span>
        <span>&nbsp;</span>
        <span className="post-message">{post.message}</span>
        <div className="post-tags">{post.tags.map((tag) => `#${tag} `)}</div>
        <button className="post-comments" onClick={openPost}>View all comments</button>
        <div className="post-time">{moment(post.createdAt).fromNow()}</div>
        {/* <div>{post.title}</div> */}
      </div>
    </article>
  );
};

export default Post;
