import axios from "axios";
import { GET_ERRORS } from "../actions/types";

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
