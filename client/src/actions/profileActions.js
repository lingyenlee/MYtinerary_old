import axios from "axios";
import { GET_USER } from "./types";

export const getUserProfile = id => dispatch => {
  console.log("get user id ", id);
  axios.get(`/user/profile`).then(response => {
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  });
};
