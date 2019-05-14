import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import groupReducer from "./groupReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  group: groupReducer,
  security: securityReducer
});
