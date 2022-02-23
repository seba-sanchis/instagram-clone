import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState("");

  const handleClick = () => {

  };

  return (
    <div>
      <div>
        <div>Comments</div>
        {comments.map((c, i) => (
          <div key={1}>Comment {i}</div>
        ))}
      </div>
      <div>
          <div>Write a comment</div>
          <textarea type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value) } />
          <button disabled={!comment} onClick={handleClick}>Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
