import {
  GET_BACKLOG,
  GET_GROUP_POST,
  DELETE_GROUP_POST,
  GET_COMMENTS
} from "../actions/types";

const initialState = {
  group_posts: [],
  group_post: {},
  comments: [],
  comment: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        group_posts: action.payload
      };

    case GET_GROUP_POST:
      return {
        ...state,
        group_post: action.payload
      };

    case DELETE_GROUP_POST:
      return {
        ...state

        // TO_DO
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        comment: action.payload
      };

    default:
      return state;
  }
}
