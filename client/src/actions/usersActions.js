import axios from "axios";
import { LOGIN, REGISTER, LOGOUT, AUTH_SIGN_UP, AUTH_ERROR } from "./types";

export const login = (email, password) => dispatch => {
  console.log("login action", { email, password });
  // let headers = {
  //   "Content-Type": "application/json",
  // };
  // , { headers: headers }
  axios
    .post("/auth/login", { email, password })
    .then(response => {
      //store in session storage
      console.log("normal login response.data is ", response.data);
      sessionStorage.setItem("token", response.data.token);

      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    })
    .catch(err =>
      dispatch({
        type: AUTH_ERROR,
        payload: "Incorrect email or password.",
      })
    );
};

// ---------------user registration -----------------------
export const register = formData => dispatch => {
  axios
    .post("/auth/register", formData)
    .then(response =>
      dispatch({
        type: REGISTER,
        payload: response.data,
      })
    )
    .catch(err =>
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use",
      })
    );
};

// export const oauthGoogle = data => {
//   return async dispatch => {
//     //data sent is access token
//     const response = await axios.post("/auth/google", {
//       access_token: data,
//     });
//     dispatch({
//       type: AUTH_SIGN_UP,
//       payload: response.data,
//     });
//     sessionStorage.setItem("token", response.data.token);
//   };
// };

export const oauthFacebook = data => {
  console.log("facebook action", data);
  return async dispatch => {
    //data sent is access token
    const response = await axios.post("/auth/facebook", {
      access_token: data,
    });
    dispatch({
      type: AUTH_SIGN_UP,
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
