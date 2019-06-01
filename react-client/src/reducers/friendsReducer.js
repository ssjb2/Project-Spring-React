import { GET_FRIENDS, GET_REC_INV, GET_SENT_INV } from "../actions/types";

const initialState = {
  friends: [],
  friend: {},
  sentInvs: [],
  sentInv: {},
  recInvs: [],
  recInv: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    case GET_REC_INV:
      return {
        ...state,
        recInvs: action.payload
      };
    case GET_SENT_INV:
      return {
        ...state,
        sentInvs: action.payload
      };
    default:
      return state;
  }
}
