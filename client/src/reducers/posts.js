// Imports
import {
  FETCH_POST,
  FETCH_POSTS,
  CREATE,
  UPDATE,
  LIKE,
  COMMENT,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/types";

// Reducer
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, post: action.payload};
    case FETCH_POSTS:
      return { ...state, posts: action.payload.data};
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return { ...state, posts: state.posts.map((post) => {
        if(post._id === action.payload._id) return action.payload;
        
        return post;
      }) };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
