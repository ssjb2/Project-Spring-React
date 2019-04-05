import { GET_GROUPS, GET_GROUP } from "../actions/types";

const initialState = {
  groups: [],
  group: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };

    case GET_GROUP:
      return {
        ...state,
        group: action.payload
      };

    default:
      return state;
  }
}
