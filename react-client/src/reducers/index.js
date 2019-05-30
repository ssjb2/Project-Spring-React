import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import groupReducer from "./groupReducer";
import securityReducer from "./securityReducer";
import backlogReducer from "./backlogReducer";
import profilReducer from "./profilReducer";

export default combineReducers({
  errors: errorReducer,
  group: groupReducer,
  security: securityReducer,
  backlog: backlogReducer,
  profil: profilReducer
});
