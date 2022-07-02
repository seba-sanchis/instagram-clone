// Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

// Component
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <main className="home-main">
      <section className="home-section">
        <div className="home-posts">
          <Posts setCurrentId={setCurrentId} />
        </div>
        {/* <div className="home-form">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div> */}
      </section>
    </main>
  );
};

export default Home;
