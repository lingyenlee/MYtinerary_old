import { GET_USER } from "../actions/types";

const initState = {
  user: {},
};

const profileReducer = (state = initState, action) => {
  console.log("profile reducer: ", action.payload);
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
