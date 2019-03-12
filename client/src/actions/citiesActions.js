import { GET_CITIES } from "./types";
import axios from "axios";

export const getCities = () => dispatch => {
  axios.get("/user/cities").then(response =>
    dispatch({
      type: GET_CITIES,
      payload: response.data,
    })
  );
};
