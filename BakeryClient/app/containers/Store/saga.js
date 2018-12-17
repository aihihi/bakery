/**
 * Gets the repositories of the user from Github
 */

import { call, put, fork, takeLatest } from 'redux-saga/effects';
import employeeWatcher from 'containers/Employee/saga';
import requestSaga from 'utils/request';
import {
  SAVE_STORE_REQUEST,
  UPDATE_STORE_REQUEST,
  LOAD_STORE_LIST_REQUEST,
  LOAD_STORE_PER_ID_REQUEST,
  DELETE_STORE_REQUEST,
} from './constants';
import {
  saveStoreSuccess,
  saveStoreFailure,
  updateStoreSuccess,
  updateStoreFailure,
  deleteStoreSuccess,
  deleteStoreFailure,
  loadStoreListSuccess,
  loadStoreListFailure,
  loadStorePerIdSuccess,
  loadStorePerIdFailure,
} from './actions';


export function* loadStoreListSaga() {
  const requestURL = 'stores';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadStoreListSuccess(response));
  } catch (err) {
    yield put(loadStoreListFailure(err));
  }
}
export function* loadStorePerIdSaga(action) {
  const requestURL = `stores/${action.payload}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadStorePerIdSuccess(response));
  } catch (err) {
    yield put(loadStorePerIdFailure(err));
  }
}
export function* deleteStoreSaga(action) {
  const requestURL = `stores/${action.payload}`;
  const config = {
    method: 'DELETE',
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(deleteStoreSuccess(response));
  } catch (err) {
    yield put(deleteStoreFailure(err));
  }
}

export function* updateStoreSaga(action) {
  const requestURL = `stores/${action.payload.id}`;
  const { id, name, address, firstOpenedDate, storeLeader, note } = action.payload;

  const config = {
    method: 'PUT',
    data: {
      id,
      name,
      address,
      firstOpenedDate,
      storeLeader,
      note,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(updateStoreSuccess(response));
  } catch (err) {
    yield put(updateStoreFailure(err));
  }
}

export function* saveStoreSaga(action) {
  // Select username from store
  const requestURL = 'stores';
  const { name, address, firstOpenedDate, storeLeader, note } = action.payload;
  const config = {
    method: 'POST',
    data: {
      name,
      address,
      firstOpenedDate,
      storeLeader,
      note,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(saveStoreSuccess(response));
  } catch (err) {
    yield put(saveStoreFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* storeWatcher() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield fork(employeeWatcher);
  yield takeLatest(SAVE_STORE_REQUEST, saveStoreSaga);
  yield takeLatest(UPDATE_STORE_REQUEST, updateStoreSaga);
  yield takeLatest(DELETE_STORE_REQUEST, deleteStoreSaga);
  yield takeLatest(LOAD_STORE_LIST_REQUEST, loadStoreListSaga);
  yield takeLatest(LOAD_STORE_PER_ID_REQUEST, loadStorePerIdSaga);
}
