// Imports
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import PostDetails from "./components/PostDetails/PostDetails";

// App
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
