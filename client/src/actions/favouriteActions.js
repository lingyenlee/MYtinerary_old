import {
  ADD_FAV_ITINERARY,
  GET_FAV_ITINERARY,
  DEL_FAV_ITINERARY,
} from "./types";
import axios from "axios";

export const addFavItinerary = (favourite, email) => dispatch => {
  axios
    .put(`/user/addFav`, {
      favourite,
      email,
    })
    .then(response => {
      dispatch({
        type: ADD_FAV_ITINERARY,
        favourite,
        email,
      });
    });
};

export const getFavItinerary = fav => dispatch => {
  // let headers = {
  //   "Content-Type": "form-data",
  // };
  axios.post(`/user/favourites`, fav).then(response => {
    dispatch({
      type: GET_FAV_ITINERARY,
      payload: response.data,
    });
  });
};

export const delFavItinerary = (favourite, email) => dispatch => {
  console.log("del fav actions:", favourite);
  axios
    .put(`/user/delFav`, {
      favourite,
      email,
    })
    .then(response => {
      dispatch({
        type: DEL_FAV_ITINERARY,
        favourite,
        email,
      });
    });
};
