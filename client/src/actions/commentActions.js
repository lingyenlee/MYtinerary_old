import { POST_COMMENT, FETCH_COMMENT } from "./types";
import axios from "axios";

//----------route is protected in the backend -------------------------------
export const postComment = (comment, profileName, itinerary_id) => {
  axios
    .post(
      "/api/postComment",
      { comment, profileName, itinerary_id },
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
    .then(response => {
      console.log(response.data);
    });
  return {
    type: POST_COMMENT,
    comment,
    profileName,
    itinerary_id,
  };
};

export const fetchComment = id => dispatch => {
  axios.get(`/api/postComment/${id}`).then(response => {
    dispatch({
      type: FETCH_COMMENT,
      payload: response.data,
    });
  });
};
