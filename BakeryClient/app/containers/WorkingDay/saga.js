import { call, put, fork, takeLatest } from 'redux-saga/effects';
import employeeWatcher from 'containers/Employee/saga';
import storeWatcher from 'containers/Store/saga';
import requestSaga from 'utils/request';
import {
  SAVE_WORKING_DAY_REQUEST,
  UPDATE_WORKING_DAY_REQUEST,
  LOAD_WORKING_DAY_LIST_REQUEST,
  LOAD_WORKING_DAY_PER_ID_REQUEST,
  DELETE_WORKING_DAY_REQUEST,
} from './constants';
import {
  saveWorkingDaySuccess,
  saveWorkingDayFailure,
  updateWorkingDaySuccess,
  updateWorkingDayFailure,
  deleteWorkingDaySuccess,
  deleteWorkingDayFailure,
  loadWorkingDayListSuccess,
  loadWorkingDayListFailure,
  loadWorkingDayPerIdSuccess,
  loadWorkingDayPerIdFailure,
} from './actions';

export function* loadWorkingDayListSaga() {
  const requestURL = 'WorkingDays';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadWorkingDayListSuccess(response));
  } catch (err) {
    yield put(loadWorkingDayListFailure(err));
  }
}
export function* loadWorkingDayPerIdSaga(action) {
  const requestURL = `WorkingDayss/${action.payload}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL);
    yield put(loadWorkingDayPerIdSuccess(response));
  } catch (err) {
    yield put(loadWorkingDayPerIdFailure(err));
  }
}
export function* deleteWorkingDaySaga(action) {
  const requestURL = `WorkingDays/${action.payload}`;
  const config = {
    method: 'DELETE',
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(deleteWorkingDaySuccess(response));
  } catch (err) {
    yield put(deleteWorkingDayFailure(err));
  }
}

export function* updateWorkingDaySaga(action) {
  const requestURL = `WorkingDays/${action.payload.id}`;
  const { id, storeId, employeeId, startTime, endTime, note } = action.payload;
  const config = {
    method: 'PUT',
    data: {
      id,
      storeId,
      employeeId,
      startTime,
      endTime,
      note,
    },
  };
  try {
    const response = yield call(requestSaga, requestURL, config);
    yield put(updateWorkingDaySuccess(response));
  } catch (err) {
    yield put(updateWorkingDayFailure(err));
  }
}

export function* saveWorkingDaySaga(action) {
  const requestURL = 'WorkingDays';
  const { storeId, employeeId, startTime, endTime, note } = action.payload;
  const config = {
    method: 'POST',
    data: {
      storeId,
      employeeId,
      startTime,
      endTime,
      note,
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(requestSaga, requestURL, config);
    yield put(saveWorkingDaySuccess(response));
  } catch (err) {
    yield put(saveWorkingDayFailure(err));
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
  yield fork(employeeWatcher);
  yield fork(storeWatcher);

  yield takeLatest(SAVE_WORKING_DAY_REQUEST, saveWorkingDaySaga);
  yield takeLatest(UPDATE_WORKING_DAY_REQUEST, updateWorkingDaySaga);
  yield takeLatest(DELETE_WORKING_DAY_REQUEST, deleteWorkingDaySaga);
  yield takeLatest(LOAD_WORKING_DAY_LIST_REQUEST, loadWorkingDayListSaga);
  yield takeLatest(LOAD_WORKING_DAY_PER_ID_REQUEST, loadWorkingDayPerIdSaga);
}
