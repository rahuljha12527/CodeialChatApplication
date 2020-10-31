import {
  AUTHENTICATE_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function signUpStart() {
  return {
    type: SIGNUP_START,
  };
}

export function signUpFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

export function signUpSuccessfull(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          // dispatch action to save user
          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
export function signup(email, password, confirm_password, name) {
  return (dispatch) => {
    //  dispatch(signUpStart());
    const url = APIUrls.signup();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ 
        email,
        password,
        confirm_password, 
        name
       }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        console.log("data success", data.success);
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          dispatch(signUpSuccessfull(data.data.user));
          return;
        }
        dispatch(signUpFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
