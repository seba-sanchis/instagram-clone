// Imports
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts"

// Component
const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = async () => {
      const finalComment = `${user.result.name}: ${comment}`;

      const newComments = await dispatch(commentPost(finalComment, post._id));

      setComments(newComments);
      setComment("");

      commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div>
        <div>Comments</div>
        {comments.map((c, i) => (
          <div key={i}>
            <span>{c.split(": ")[0]}</span>
            <span>{c.split(":")[1]}</span>
          </div>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name && (
      <div>
          <div>Write a comment</div>
          <textarea type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value) } />
          <button disabled={!comment} onClick={handleClick}>Comment</button>
      </div>
      )}
    </div>
  );
};

export default CommentSection;
