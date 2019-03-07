import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itineraryReducer from "./itineraryReducer";
import activityReducer from "./activityReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import favouriteReducer from "./favouriteReducer";

const rootReducer = combineReducers({
  cityReducer,
  itineraryReducer,
  activityReducer,
  commentReducer,
  userReducer,
  profileReducer,
  favouriteReducer,
});

export default rootReducer;
