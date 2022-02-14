// Imports

import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

import { createPost } from "../../actions/posts"

// Component

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost(postData));
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="creator" value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value }) } />
        <input type="text" name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value }) } />
        <input type="text" name="message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value }) } />
        <input type="text" name="tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value }) } />
        <div>
            <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
        </div>
        <input type="submit" value="Submit" />
    </form>
  )
};

export default Form;
