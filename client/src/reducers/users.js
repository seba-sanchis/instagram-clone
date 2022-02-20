// Imports
import { FETCH_USERS } from "../constants/actionTypes";

// Reducer
export default (users = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return users;
  }
};
