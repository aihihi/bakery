/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import requestSaga from 'utils/request';
import { SAVE_EMPLOYEE_REQUEST, LOAD_EMPLOYEE_LIST_REQUEST,
  LOAD_EMPLOYEE_PER_ID_REQUEST,
} from './Employee/constants';
import {
  saveEmployeeSuccess,
  saveEmployeeFailure,
  loadEmployeeListSuccess,
  loadEmployeeListFailure,
  loadEmployeePerIdSuccess,
  loadEmployeePerIdFailure,
} from './Employee/actions';


export function* loadEmployeeListSaga() {
  const requestURL = 'employees';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadEmployeeListSuccess(response));
  } catch (err) {
    yield put(loadEmployeeListFailure(err));
  }
}
export function* loadEmployeePerIdSaga(action) {
  const requestURL = `employees/${action.payload}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadEmployeePerIdSuccess(response));
  } catch (err) {
    yield put(loadEmployeePerIdFailure(err));
  }
}
export function* saveEmployeeSaga(action) {
  // Select username from store
  const requestURL = 'employees';
  const { fullName, mobilePhone, address, birthday, joinedDate, note } = action.payload;
  const config = {
    method: 'POST',
    data: {
      fullName,
      mobilePhone,
      address,
      birthday,
      joinedDate,
      note,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(saveEmployeeSuccess(response));
  } catch (err) {
    yield put(saveEmployeeFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* employeeData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SAVE_EMPLOYEE_REQUEST, saveEmployeeSaga);
  yield takeLatest(LOAD_EMPLOYEE_LIST_REQUEST, loadEmployeeListSaga);
  yield takeLatest(LOAD_EMPLOYEE_PER_ID_REQUEST, loadEmployeePerIdSaga);
}
