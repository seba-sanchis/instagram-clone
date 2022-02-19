// Imports
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

// Component
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "", });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  if(!user?.result?.name) {
    return (
      <div>Please Sign In to create your own posts and like other's posts.</div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{currentId ? "Editing" : "Creating"}</div>
      <input
        type="text"
        name="title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <input
        type="text"
        name="message"
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <input
        type="text"
        name="tags"
        value={postData.tags}
        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
      />
      <div>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
