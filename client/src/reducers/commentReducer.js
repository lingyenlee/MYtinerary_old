import { POST_COMMENT, FETCH_COMMENT } from "../actions/types";

const initState = {
  comment: [],
  post: {}
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_COMMENT:
      return {
        ...state,
        comment: action.payload
      };
    case POST_COMMENT:
      return {
        ...state,
        post: {
          comment: action.comment,
          itinerary_id: action.itinerary_id,
          username: action.username
        }
      };
    default:
      return state;
  }
};

export default commentReducer;
