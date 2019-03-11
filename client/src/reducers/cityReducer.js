import { GET_CITIES } from "../actions/types";

//the initial state
const initState = {
  cities: [],
};

//the reducer takes in current state and actions as parameters and
// return the new state depending on the action function called
// if no new data return original state
const cityReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export default cityReducer;
