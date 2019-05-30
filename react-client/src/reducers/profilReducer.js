import { GET_PROFILE } from "../actions/types";

const initialState = {
  profil: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profil: action.payload
      };
    default:
      return state;
  }
}
