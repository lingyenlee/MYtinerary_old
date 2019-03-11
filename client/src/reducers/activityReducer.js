import { GET_ACTIVITY } from "../actions/types";

const initState = {
  activities: [],
};

const activityReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export default activityReducer;
