import { GET_ITINERARY, GET_ALL_ITINERARIES } from "../actions/types";

const initState = {
  itineraries: [],
};

const itineraryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ITINERARY:
      return {
        ...state,
        itineraries: action.payload,
      };
    default:
      return state;
  }
};

export default itineraryReducer;
