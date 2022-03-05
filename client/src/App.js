// Imports
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import "./App.scss";
import PostDetails from "./components/PostDetails/PostDetails";

// App
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
