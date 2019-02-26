import { POST_COMMENT, FETCH_COMMENT } from "./types";
import axios from "axios";

export const postComment = (comment, username, itinerary_id) => {
  axios
    .post(
      "/api/postComment",
      { comment, username, itinerary_id },
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
    .then(response => {
      console.log(response.data);
    });
  return {
    type: POST_COMMENT,
    comment,
    username,
    itinerary_id
  };
};

export const fetchComment = id => dispatch => {
  axios.get(`/api/postComment/${id}`).then(response => {
    dispatch({
      type: FETCH_COMMENT,
      payload: response.data
    });
  });
};
