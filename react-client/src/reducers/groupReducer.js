import { GET_GROUPS } from "../actions/types";

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

    default:
      return state;
  }
}
