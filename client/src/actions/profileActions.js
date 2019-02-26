import axios from "axios";
import { GET_USER_PROFILE } from "./types";

export const getUserProfile = () => dispatch => {
  console.log(localStorage.getItem("user"));
  axios
    .post("/api/sendProfile", {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user")
      }
    })
    .then(response => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: response.data
      });
    });
};
