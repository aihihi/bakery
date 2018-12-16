import {
  SAVE_WORKING_DAY_REQUEST,
  SAVE_WORKING_DAY_SUCCESS,
  SAVE_WORKING_DAY_ERROR,
  DELETE_WORKING_DAY_REQUEST,
  DELETE_WORKING_DAY_SUCCESS,
  DELETE_WORKING_DAY_ERROR,
  LOAD_WORKING_DAY_LIST_REQUEST,
  LOAD_WORKING_DAY_LIST_SUCCESS,
  LOAD_WORKING_DAY_LIST_ERROR,
  LOAD_WORKING_DAY_PER_ID_REQUEST,
  LOAD_WORKING_DAY_PER_ID_SUCCESS,
  LOAD_WORKING_DAY_PER_ID_ERROR,
  UPDATE_WORKING_DAY_REQUEST,
  UPDATE_WORKING_DAY_SUCCESS,
  UPDATE_WORKING_DAY_ERROR,
  RESET_WORKING_DAY_SUCCESS,
  SET_CURRENT_WORKING_DAY,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function saveWorkingDayRequest(payload) {
  return {
    type: SAVE_WORKING_DAY_REQUEST,
    payload,
  };
}
export function saveWorkingDaySuccess(payload) {
  return {
    type: SAVE_WORKING_DAY_SUCCESS,
    payload,
  };
}
export function saveWorkingDayFailure(payload) {
  return {
    type: SAVE_WORKING_DAY_ERROR,
    payload,
  };
}
export function deleteWorkingDayRequest(payload) {
  return {
    type: DELETE_WORKING_DAY_REQUEST,
    payload,
  };
}
export function deleteWorkingDaySuccess(payload) {
  return {
    type: DELETE_WORKING_DAY_SUCCESS,
    payload,
  };
}
export function deleteWorkingDayFailure(payload) {
  return {
    type: DELETE_WORKING_DAY_ERROR,
    payload,
  };
}
export function updateWorkingDayRequest(payload) {
  return {
    type: UPDATE_WORKING_DAY_REQUEST,
    payload,
  };
}
export function updateWorkingDaySuccess(payload) {
  return {
    type: UPDATE_WORKING_DAY_SUCCESS,
    payload,
  };
}
export function updateWorkingDayFailure(payload) {
  return {
    type: UPDATE_WORKING_DAY_ERROR,
    payload,
  };
}
export function loadWorkingDayListRequest(payload) {
  return {
    type: LOAD_WORKING_DAY_LIST_REQUEST,
    payload,
  };
}
export function loadWorkingDayListSuccess(payload) {
  return {
    type: LOAD_WORKING_DAY_LIST_SUCCESS,
    payload,
  };
}
export function loadWorkingDayListFailure(payload) {
  return {
    type: LOAD_WORKING_DAY_LIST_ERROR,
    payload,
  };
}
export function loadWorkingDayPerIdRequest(payload) {
  return {
    type: LOAD_WORKING_DAY_PER_ID_REQUEST,
    payload,
  };
}
export function loadWorkingDayPerIdSuccess(payload) {
  return {
    type: LOAD_WORKING_DAY_PER_ID_SUCCESS,
    payload,
  };
}
export function loadWorkingDayPerIdFailure(payload) {
  return {
    type: LOAD_WORKING_DAY_PER_ID_ERROR,
    payload,
  };
}

export function resetWorkingDaySuccess() {
  return {
    type: RESET_WORKING_DAY_SUCCESS,
  };
}

export function setCurrentWorkingDay(payload) {
  return {
    type: SET_CURRENT_WORKING_DAY,
    payload,
  };
}
