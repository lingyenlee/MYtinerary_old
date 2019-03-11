import { GET_FAV_ITINERARY, ADD_FAV_ITINERARY } from "../actions/types";

const initialState = {
  fav: [],
  allFav: [],
};

const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV_ITINERARY:
      return {
        ...state,
        fav: action.payload,
      };
    case GET_FAV_ITINERARY:
      return {
        ...state,
        allFav: action.payload,
      };
    default:
      return state;
  }
};

export default favouriteReducer;
