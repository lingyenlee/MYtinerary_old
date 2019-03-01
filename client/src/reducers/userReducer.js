import {
  REGISTER,
  LOGIN,
  GOOGLE_SIGN_UP,
  LOGOUT,
  ADD_FAV_ITINERARY,
  GET_FAV_ITINERARY,
  DEL_FAV_ITINERARY,
} from "../actions/types";

const initialState = {
  loggedIn: false,
  user: {},
  token: "",
  errorMessage: "",
  selectedItineraries: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case LOGIN:
      console.log("normallogin action payload is ", action.payload);
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        errorMessage: "",
      };
    case GOOGLE_SIGN_UP:
      console.log("googlelogin action payload is ", action.payload.user);
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        errorMessage: "",
      };
    case LOGOUT:
      return {
        loggedIn: false,
        errorMessage: "",
      };
    case ADD_FAV_ITINERARY:
      return {
        ...state,
        user: {
          email: action.email,
          favItinerary: [action.favourite, ...state.user.favItinerary],
        },
      };
    case GET_FAV_ITINERARY:
      return {
        ...state,
        selectedItineraries: action.payload,
      };
    case DEL_FAV_ITINERARY:
      return {
        ...state,
        selectedItineraries: state.selectedItineraries.filter(itinerary => {
          return itinerary._id !== action.favourite;
        }),
        user: {
          email: action.email,
          favItinerary: state.user.favItinerary.filter(itinerary => {
            return itinerary !== action.favourite;
          }),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
