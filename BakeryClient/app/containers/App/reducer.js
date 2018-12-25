import { fromJS } from 'immutable';

import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_UNAUTHORIZED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isLoggingIn: false, // Busy
  isLoggedIn: false,
  userInfo: null,
  accessToken: null,
  loginError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return state
        .set('isLoggingIn', true);

    case LOGIN_SUCCESS:
      return state
        .set('isLoggedIn', true)
        .set('isLoggingIn', false)
        .set('accessToken', action.accessToken)
        .set('userInfo', action.userInfo)
        .set('loginError', null);

    case LOGIN_FAILURE:
      return state
        .set('isLoggingIn', false)
        .set('loginError', action.errorMessage);

    case LOGOUT:
      return initialState;

    case LOGOUT_UNAUTHORIZED:
      return state.set('loginError', '');

    default:
      return state;
  }
}

export default appReducer;
