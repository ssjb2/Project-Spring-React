import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_GROUP_POST } from "./types";

export const addGroupPost = (
  backlog_id,
  group_post,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, group_post);
    history.push(`/groupBoard/${backlog_id}`);
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

export const getBacklog = backlog_id => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getGroupPost = (backlog_id, gp_id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}/${gp_id}`);
    dispatch({
      type: GET_GROUP_POST,
      payload: res.data
    });
  } catch (err) {
    history.push("/dashboard");
  }
};
export const updateGroupPost = (
  backlog_id,
  gp_id,
  group_post,
  history
) => async dispatch => {
  try {
    await axios.patch(`/api/backlog/${backlog_id}/${gp_id}`, group_post);
    history.push(`/groupBoard/${backlog_id}`);
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
