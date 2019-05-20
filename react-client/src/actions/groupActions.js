import axios from "axios";
import {
  GET_ERRORS,
  GET_GROUPS,
  GET_GROUP,
  DELETE_GROUP
} from "../actions/types";

export const createGroup = (group, history) => async dispatch => {
  try {
    await axios.post("/api/groups", group);
    history.push("/dashboard");
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

export const getGroups = () => async dispatch => {
  const res = await axios.get("/api/groups/all");
  dispatch({
    type: GET_GROUPS,
    payload: res.data
  });
};

export const getGroup = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteGroup = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure you want delete group and all the data related to it?"
    )
  )
    await axios.delete(`/api/groups/${id}`);
  dispatch({
    type: DELETE_GROUP,
    payload: id
  });
};
