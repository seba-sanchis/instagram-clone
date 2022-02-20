// Imports
import { FETCH_USERS } from "../constants/actionTypes";
import * as api from "../api/index.js";

// Action Creators
export const getUsersBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data: { data } } = await api.fetchUsersBySearch(searchQuery);
    
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};