// Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPost } from "../../actions/posts";
import CommentSection from "./CommentSection";

// Component
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;

  if (isLoading) {
    return "LOADING...";
  }

  return (
    <div>
      <div>
        <img src={post.selectedFile} alt={post.name + "'s post picture"} />
      </div>
      <div>{post.title}</div>
      <div>{post.name}</div>
      <div>{moment(post.createdAt).fromNow()}</div>
      <div>{post.tags.map((tag) => `#${tag} `)}</div>
      <div>{post.message}</div>
      <CommentSection post={post} />
    </div>
  );
};

export default PostDetails;
