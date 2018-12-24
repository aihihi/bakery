import { call, put, takeLatest, select } from 'redux-saga/effects';
import { replace, push } from 'react-router-redux';
import Auth0API from './auth0API';
// import qs from 'qs';

import {
  // getStoredAuthState,
  removeStoredAuthState,
  setStoredAuthState,
} from './storedAuthState';
// import { getAuth0Credentials } from 'services/configService';

import {
  LOGIN_WITH_USERNAME_PASSWORD,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_UNAUTHORIZED,
} from 'containers/App/constants';

import {
  loginBegin,
  loginSuccess,
  loginFailure,
} from 'containers/App/actions';

import { selectIsLoggedIn, selectLocation } from 'containers/App/selectors';

// This is the non saga version of request.
// It does not add the token.
// It does not boot the user out on unauthorised.
// import request from 'api/request';

// import messages from '../messages';

// const auth0Creds = getAuth0Credentials();
const auth0API = new Auth0API('localhost:44394');
// const isProduction = process.env.NODE_ENV === 'production';

export default function* authWatcher() {
  yield takeLatest(LOGIN_WITH_USERNAME_PASSWORD, loginWithUsernamePasswordSaga);
  yield takeLatest(LOGIN_SUCCESS, loginSuccessSaga);
  yield takeLatest(LOGOUT, logoutSaga);

  // const currentLocationObj = yield select(selectLocation);

  // Check the url for auth data and perform login.
  // yield call(handleAuthURLCallback, currentLocationObj);

  // Check the url for username and password and perform login
  // yield call(handleAutoLoginWithCreds, currentLocationObj);

  // Did we end up logging in via the hash?
  // const isLoggedIn = yield select(selectIsLoggedIn);

  // Restore saved auth state using login action to provide consistent behaviour
  // so other sagas can rely on the login action to bootstrap other actions or sagas.
  // const authState = getStoredAuthState();
  // if (authState && !isLoggedIn) {
  //   yield put(loginSuccess(authState.accessToken, authState.idToken, authState.profile));
  // }
}

// This is used for passwordless login or any login that uses the callback/redirect url method.
// function* handleAuthURLCallback(routeInfo) {
//   const urlParams = qs.parse(routeInfo.hash.substring(1));
//
//   if (urlParams.access_token && urlParams.id_token) {
//     yield put(replace({
//       pathname: routeInfo.pathname,
//       search: routeInfo.search,
//     })); // Remove auth info from route.
//
//     yield call(loginWithToken, urlParams.access_token, urlParams.id_token);
//   }
// }

// function* handleAutoLoginWithCreds(routeInfo) {
//   const urlParams = qs.parse(routeInfo.hash.substring(1));
//
//   if (urlParams.username && urlParams.password) {
//     yield put(replace({
//       pathname: routeInfo.pathname,
//       search: routeInfo.search,
//     })); // Remove auth info from route.
//
//     yield call(loginWithUsernamePasswordSaga, {
//       username: urlParams.username,
//       password: urlParams.password,
//     });
//   }
// }

function* loginWithUsernamePasswordSaga({ username, password }) {
  yield put(loginBegin()); // Updates UI

  try {
    const data = yield call([auth0API, auth0API.getToken], username, password);
    setStoredAuthState(data.token, data.profile);
    yield put(loginSuccess(data.token, data.profile));

    // const tokenInfo = yield call(getTokenFromAPI, username, password);
    // yield call(loginWithToken, tokenInfo.access_token, tokenInfo.id_token);
  } catch (error) {
    if (error.type) {
      yield put(error);
      return;
    }

    yield put(loginFailure(error));
  }
}

function* loginSuccessSaga({ accessToken, idToken, userInfo }) {
  // const currentLocationObj = yield select(selectLocation);
  setStoredAuthState(accessToken, idToken, userInfo);


  // // Remove email from query string.
  // const queryParams = qs.parse(currentLocationObj.search.substring(1));
  // if (queryParams.email) {
  //   delete queryParams.email;
  //
  //   yield put(replace({
  //     search: qs.stringify(queryParams, DEFAULT_QS_STRINGIFY_OPTIONS),
  //   }));
  // }
}

function* logoutSaga({ type }) {
  removeStoredAuthState();

  // Redirect to root URL if the user was booted out due to a dodgy token.
  if (type === LOGOUT_UNAUTHORIZED) {
    yield put(push('/'));
  }


}

function* loginWithToken(accessToken, idToken) {
  yield put(loginBegin()); // Updates UI

  try {
    const userInfo = yield call(getUserInfoFromAPI, accessToken);
    const validStatus = yield call(validateProfile, userInfo);

    if (validStatus.valid) {
      yield put(loginSuccess(accessToken, idToken, userInfo));
    } else {
      // TODO: Use i18n message ids for error when validation is implemented.
      yield put(loginFailure(validStatus.reason));
    }
  } catch (error) {
    if (error.type) {
      yield put(loginFailure(messages[`auth0_${error.type}`]));
      return;
    }

    // Any other error
    yield put(loginFailure(messages.auth0_unexpected_result));
  }
}

function* getTokenFromAPI(username, password) {
  return yield call([auth0API, auth0API.getToken], username, password);
}

function* getUserInfoFromAPI(accessToken) {
  return yield call([auth0API, auth0API.getUserInfo], accessToken);
}

