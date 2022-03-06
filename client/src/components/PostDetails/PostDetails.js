// Imports
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost, deletePost, likePost, commentPost } from "../../actions/posts";
import "./PostDetails.scss";

// Component
const PostDetails = ({ setCurrentId }) => {
  const { post, isLoading } = useSelector((state) => state.posts);
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.googleId || user?.result?._id;
  const commentsRef = useRef();
  const hasLikedPost = likes?.find((like) => like === userId);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  
  if (!post) return null;

  if (isLoading) {
    return "LOADING...";
  }

  const handleComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Menu = () => (
    <>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <>
          <button className="details-menu-warning" onClick={() => setCurrentId(post._id)}>Edit</button>
          <button className="details-menu-warning" onClick={() => dispatch(deletePost(post._id))}> Delete </button>
        </>
      )}
      <button onClick={() => setToggleMenu(false)}>Cancel</button>
    </>
  );

  const Comments = () => (
    <>
      <div>
        {comments?.map((c, i) => (
          <div className="details-message" key={i}>
            <span className="details-user">{c.split(": ")[0]}</span>
            <span className="details-message">{c.split(":")[1]}</span>
          </div>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name && (
      <div>

      </div>
      )}
    </>
  );

  const Likes = () => {
    if (likes?.length > 0) {
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

    return null;
  };

  return (
    <div className="details-container">
    <article className="details">
      <div className="details-img-container">
        <img className="details-img" src={post.selectedFile} alt={post.name + "'s post picture"} />
      </div>
      <div className="details-social-container">
        <div className="details-header-container">
          <header className="details-header">
            <div className="details-user">{post.name}</div>
          </header>
            <button className="details-menu-btn" onClick={() => setToggleMenu(true)}>
              <svg className="details-menu-icon" role="img" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </button>
          {toggleMenu && (
            <div className="details-menu" onClick={() => setToggleMenu(false)}>
              <div className="details-menu-container">
                <Menu />
              </div>
            </div>
          )}
        </div>
        <div className="details-comments-container">
          <span className="details-user">{post.name}</span>
          <span>&nbsp;</span>
          <span className="details-message">{post.message}</span>
          <div className="details-tags">{post.tags.map((tag) => `#${tag} `)}</div>
          <Comments />
        </div>
        <section className="details-btns">
          <button className="details-like-btn" disabled={!user?.result} onClick={handleLike}>
          <svg className={hasLikedPost ? "details-unlike-icon" : "details-like-icon"} role="img"  viewBox={hasLikedPost ? "0 0 48 48" : "0 0 24 24"}><path d={hasLikedPost ? "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" : "M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"}></path></svg>
          </button>
          <button className="details-comment-btn" onClick={() => {}}>
          <svg className="details-comment-icon" role="img" viewBox="0 0 24 24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"></path></svg>
          </button>
        </section>
        <section className={<Likes /> === null ? "" : "details-likes"}>
          <Likes />
        </section>
        <div className="details-time">{moment(post.createdAt).fromNow()}</div>
        <section className="details-comment-add">
          <div className="details-emoji-container">
            <button className="details-emoji-btn">
              <svg className="details-emoji-icon" role="img" viewBox="0 0 24 24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
            </button>
          </div>
          <textarea className="details-comment-area" type="text" name="comment" value={comment} placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} onKeyPress={event => event.key === 'Enter' && comment ? handleComment() : null} />
          <button className="details-comment-send" disabled={!comment} onClick={handleComment}>Post</button>
        </section>
      </div>
    </article>
    </div>
  );
};

export default PostDetails;
