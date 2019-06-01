import axios from "axios";
import { GET_FRIENDS, GET_REC_INV, GET_SENT_INV, GET_ERRORS } from "./types";

export const getFriends = () => async dispatch => {
  const res = await axios.get(`/api/users/friends`);
  dispatch({
    type: GET_FRIENDS,
    payload: res.data
  });
};
export const getSentInv = () => async dispatch => {
  const res = await axios.get(`/api/users/invite/view/sentInv`);
  dispatch({
    type: GET_SENT_INV,
    payload: res.data
  });
};
export const getRecInv = () => async dispatch => {
  const res = await axios.get(`/api/users/invite/view/recInv`);
  dispatch({
    type: GET_REC_INV,
    payload: res.data
  });
};

export const inviteFriend = (username, history) => async dispatch => {
  try {
    await axios.post(`/api/users/invite/${username}`);
    history.push(`/profile/friends`);
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

export const acceptFriend = (username, history) => async dispatch => {
  try {
    await axios.post(`/api/users/invite/accept/${username}`);
    history.push(`/profile/friends`);
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
export const declineFriend = (username, history) => async dispatch => {
  try {
    await axios.post(`/api/users/invite/decline/${username}`);
    history.push(`/profile/friends`);
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
