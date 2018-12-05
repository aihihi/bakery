import axios from 'axios';
import { put, call, select } from 'redux-saga/effects';
// import { logoutUnauthorized } from 'containers/App/actions/authActions';
// import { selectAuthAccessToken } from 'containers/App/selectors';

const apiEndpoint = 'localhost:44394/api';

const requestInstance = axios.create({
  baseURL: apiEndpoint,
});

function request(url, options) {
  const requestOptions = Object.assign({}, options);
  requestOptions.url = url;

  return requestInstance.request(url, requestOptions)
  .then((response) => ({ payload: response.data }))
  .catch((error) => ({ error }));
}

// !!! IMPORTANT !!!
// This next export has been added into to allow us to mock the request function
// while testing requestSaga, so to avoid doing an actual http request. Please
// do not import this into actual production code, it will be going away as soon
// as we find a better way to test requestSaga.
// TODO: remove lib and update request.test.js to mock axios instead
export const lib = {
  request,
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url                 The URL we want to request
 * @param  {object} [options]           The options we want to pass to "fetch"
 *
 * @return {object}                     The response data
 */
export default function* requestSaga(url, options = {}) {
//   const token = yield select(selectAuthAccessToken);
  const requestOptions = Object.assign(options, {
    headers: Object.assign(
      options.headers || {},
    //   !options.noAuth && { Authorization: `Bearer ${token}` },
    //   {
    //     'Content-Type': 'application/json',
    //   },
    ),
  });

  const { payload, error } = yield call(lib.request, url, requestOptions);
//   if (error) {
//     if (error.response && error.response.status) {
//       if (error.response.status === 401 && !options.noAuth) {
//         yield put(logoutUnauthorized());
//         return null;
//       }
//     }
//     throw error;
//   }

  return payload;
}
