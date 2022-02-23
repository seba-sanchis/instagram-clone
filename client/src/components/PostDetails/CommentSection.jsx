// Imports
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts"

// Component
const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
      const finalComment = `${user.result.name}: ${comment}`;
      dispatch(commentPost(finalComment, post._id));
  };

  return (
    <div>
      <div>
        <div>Comments</div>
        {comments.map((c, i) => (
          <div key={i}>Comment {i}</div>
        ))}
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
