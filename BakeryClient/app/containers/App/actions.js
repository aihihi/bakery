import {
  LOGIN_WITH_USERNAME_PASSWORD,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_UNAUTHORIZED,

} from 'containers/App/constants';

export function loginWithUsernamePassword(username, password) {
  return {
    type: LOGIN_WITH_USERNAME_PASSWORD,
    username,
    password,
  };
}

// Used for updating UI
export function loginBegin() {
  return {
    type: LOGIN_BEGIN,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutUnauthorized() {
  return {
    type: LOGOUT_UNAUTHORIZED,
  };
}

export function loginSuccess(accessToken, userInfo) {
  return {
    type: LOGIN_SUCCESS,
    accessToken,
    userInfo,
  };
}

export function loginFailure(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    errorMessage,
  };
}

