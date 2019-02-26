import axios from "axios";
import { LOGIN, GOOGLE_SIGN_UP, REGISTER, LOGOUT } from "./types";

export const login = data => dispatch => {
  console.log("login action", data);
  let headers = {
    "Content-Type": "application/json",
  };
  axios
    .post("/auth/login", data, { headers: headers })
    .then(response => {
      //store in session storage
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);

      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    })
    .catch(err => console.log(err));
};

// ---------------user registration -----------------------
export const register = userData => dispatch => {
  axios.post("/auth/register", userData).then(response =>
    dispatch({
      type: REGISTER,
      payload: response.data,
    })
  );
};

export const oauthGoogle = data => {
  return async dispatch => {
    //data sent is access token
    const response = await axios.post("/auth/google", {
      access_token: data,
    });
    dispatch({
      type: GOOGLE_SIGN_UP,
      payload: response.data,
    });
    sessionStorage.setItem("token", response.data.token);
  };
};

export const logOut = () => {
  sessionStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};
