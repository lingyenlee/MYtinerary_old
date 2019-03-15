import {
  REGISTER,
  LOGIN,
  AUTH_SIGN_UP,
  AUTH_ERROR,
  LOGOUT,
  GET_USER,
} from "../actions/types";

const initialState = {
  loggedIn: false,
  user: {},
  token: "",
  errorMessage: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      console.log("register", action.payload);
      return {
        ...state,
        errorMessage: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        errorMessage: action.payload,
      };
    case AUTH_SIGN_UP:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        errorMessage: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case LOGOUT:
      return {
        loggedIn: false,
        errorMessage: "",
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
