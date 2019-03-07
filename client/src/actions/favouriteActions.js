import { ADD_FAV_ITINERARY, GET_FAV_ITINERARY } from "./types";
import axios from "axios";

export const addFavItinerary = (favourite, email) => dispatch => {
  axios
    .post(`/user/addFav`, {
      favourite,
      email,
    })
    .then(response => {
      dispatch({
        type: ADD_FAV_ITINERARY,
        payload: response.data,
      });
    });
};

export const getFavItinerary = email => {
  return async dispatch => {
    //data sent is access token
    const response = await axios.post(`/user/favourites`, { email: email });
    dispatch({
      type: GET_FAV_ITINERARY,
      payload: response.data,
    });
  };
};

export const delFavItinerary = (favourite, email) => dispatch => {
  axios
    .post(`/user/delFav`, {
      favourite,
      email,
    })
    .then(response => {
      dispatch({
        type: GET_FAV_ITINERARY,
        payload: response.data,
      });
    });
};
