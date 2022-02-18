// Imports
import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

// Reducers
export default combineReducers({ posts, auth });