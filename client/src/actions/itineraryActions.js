import { GET_ITINERARY } from "./types";
import axios from "axios";

export const getItinerary = city => dispatch => {
  axios.get(`/api/itineraries/${city}`).then(response => {
    dispatch({
      type: GET_ITINERARY,
      payload: response.data,
    });
  });
};
