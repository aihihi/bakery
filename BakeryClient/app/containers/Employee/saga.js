/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import requestSaga from 'utils/request';
import {
  SAVE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  LOAD_EMPLOYEE_LIST_REQUEST,
  LOAD_EMPLOYEE_PER_ID_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
  SET_EMPLOYEES_WORKING_FOR,
  LOAD_EMPLOYEE_PER_STORE_REQUEST,
} from './constants';
import {
  saveEmployeeSuccess,
  saveEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  loadEmployeeListSuccess,
  loadEmployeeListFailure,
  loadEmployeePerIdSuccess,
  loadEmployeePerIdFailure,
  loadEmployeePerStoreSuccess,
  loadEmployeesPerStoreFailure,
} from './actions';
import { saveStoreFailure, saveStoreSuccess } from '../Store/actions';


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
export function* loadEmployeePerStoreSaga(action) {
  const requestURL = `employees/perStore/${action.payload}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadEmployeePerStoreSuccess(response));
  } catch (err) {
    yield put(loadEmployeePerStoreFailure(err));
  }
}
export function* deleteEmployeeSaga(action) {
  const requestURL = `employees/${action.payload}`;
  const config = {
    method: 'DELETE',
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(deleteEmployeeSuccess(response));
  } catch (err) {
    yield put(deleteEmployeeFailure(err));
  }
}

export function* updateEmployeeSaga(action) {
  const requestURL = `employees/${action.payload.id}`;
  const { id, fullName, mobilePhone, address, birthday, joinedDate, note } = action.payload;

  const config = {
    method: 'PUT',
    data: {
      id,
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
    yield put(updateEmployeeSuccess(response));
  } catch (err) {
    yield put(updateEmployeeFailure(err));
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

export function* setEmployeeWorkingForSaga(action) {
  // Select username from store
  const requestURL = 'employees/multipleUpdateWorkingFor';
  const { storeId, employeeIds } = action;
  const config = {
    method: 'POST',
    data: {
      storeId,
      employeeIds,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    // yield put(saveStoreSuccess(response));
  } catch (err) {
    // yield put(saveStoreFailure(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* employeeWatcher() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SAVE_EMPLOYEE_REQUEST, saveEmployeeSaga);
  yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
  yield takeLatest(LOAD_EMPLOYEE_LIST_REQUEST, loadEmployeeListSaga);
  yield takeLatest(LOAD_EMPLOYEE_PER_ID_REQUEST, loadEmployeePerIdSaga);
  yield takeLatest(LOAD_EMPLOYEE_PER_STORE_REQUEST, loadEmployeePerStoreSaga);
  yield takeLatest(SET_EMPLOYEES_WORKING_FOR, setEmployeeWorkingForSaga);
}
