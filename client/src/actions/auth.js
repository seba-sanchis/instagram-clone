// Imports
import { AUTH } from "../constants/types";
import * as api from "../api/index.js";

// Action Creators
export const signin = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
