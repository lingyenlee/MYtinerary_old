import {createStore, applyMiddleware} from  "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initState = {};

//middleware to call action creators that 
//return a function instead of an action object
// to communicate asynchronously with external API to get or post data
//used by action creater to return a function and executed by thunk
const middleware = [thunk];

const store = createStore(rootReducer, initState, composeWithDevTools(
    applyMiddleware(...middleware))
);

export default store;