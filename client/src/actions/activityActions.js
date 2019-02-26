import { GET_ACTIVITY } from "./types";
import axios from "axios";

export const getActivity = id => dispatch => {
  axios.get(`/api/activities/${id}`).then(response =>
    dispatch({
      type: GET_ACTIVITY,
      payload: response.data
    })
  );
};
