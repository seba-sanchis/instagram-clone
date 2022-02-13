// Imports

import axios from "axios";

// Fetch

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);