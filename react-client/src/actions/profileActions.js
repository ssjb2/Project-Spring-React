import axios from "axios";
import { GET_ERRORS, GET_PROFILE } from "./types";

export const getProfile = (username, history) => async dispatch => {
  const res = await axios.get(`/api/users/profile/${username}`);
  dispatch({
    type: GET_PROFILE,
    payload: res.data
  });
};

export const updateProfile = (username, profil, history) => async dispatch => {
  try {
    await axios.post(`/api/users/profile/edit/${username}`, profil);
    history.push(`/profile/${username}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
