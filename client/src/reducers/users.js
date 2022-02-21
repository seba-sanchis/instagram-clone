// Imports
import { FETCH_USERS } from "../constants/actionTypes";

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};
