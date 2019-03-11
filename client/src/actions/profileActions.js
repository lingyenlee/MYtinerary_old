import axios from "axios";
import { GET_USER } from "./types";

export const getUserProfile = email => dispatch => {
  axios.post("/user/profile", { email: email }).then(response => {
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  });
};
