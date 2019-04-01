import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  errors: errorReducer,
  group: groupReducer
});
