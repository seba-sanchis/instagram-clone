// Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

// Component
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    if (currentId !== null) {
      setToggleForm(true);
    }
  }, [currentId, dispatch]);

  useEffect(() => {
    if (!toggleForm) {
      setCurrentId(null);
    }
  }, [toggleForm]);

  useEffect(() => {
    if (currentId == null) {
      setToggleForm(false);
    }  }, [<Form/>]);
  
  if (toggleForm) {
    document.body.classList.add('body-form-overflow');
  } else {
    document.body.classList.remove('body-form-overflow');
  }
  
  return (
    <main className="home-main">
      <section className="home-section">
        <div className="home-posts">
          <Posts setCurrentId={setCurrentId} />
        </div>
        {toggleForm && (
          <div className="home-form">
            <div className="home-form-background" onClick={() => setToggleForm(false)}></div>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
