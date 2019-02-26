import { GET_ACTIVITY } from "../actions/types";

const initState = {
  activities: []
};

const activityReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ACTIVITY:
      // console.log("here is the activity reducer payload", action.payload);
      return {
        ...state,
        activities: action.payload
      };
    default:
      return state;
  }
};

export default activityReducer;
