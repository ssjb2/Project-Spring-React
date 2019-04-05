import axios from "axios";
import { GET_ERRORS, GET_GROUPS, GET_GROUP } from "../actions/types";

export const createGroup = (group, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/groups", group);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getGroups = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/groups/all");
  dispatch({
    type: GET_GROUPS,
    payload: res.data
  });
};

export const getGroup = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/groups/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};
