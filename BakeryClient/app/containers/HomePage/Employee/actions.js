import {
  SAVE_EMPLOYEE_REQUEST,
  SAVE_EMPLOYEE_SUCCESS,
  SAVE_EMPLOYEE_ERROR,
  LOAD_EMPLOYEE_LIST_REQUEST,
  LOAD_EMPLOYEE_LIST_SUCCESS,
  LOAD_EMPLOYEE_LIST_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function saveEmployeeRequest(payload) {
  return {
    type: SAVE_EMPLOYEE_REQUEST,
    payload,
  };
}
export function saveEmployeeSuccess(payload) {
  return {
    type: SAVE_EMPLOYEE_SUCCESS,
    payload,
  };
}
export function saveEmployeeFailure(payload) {
  return {
    type: SAVE_EMPLOYEE_ERROR,
    payload,
  };
}
export function loadEmployeeListRequest(payload) {
  return {
    type: LOAD_EMPLOYEE_LIST_REQUEST,
    payload,
  };
}
export function loadEmployeeListSuccess(payload) {
  return {
    type: LOAD_EMPLOYEE_LIST_SUCCESS,
    payload,
  };
}
export function loadEmployeeListFailure(payload) {
  return {
    type: LOAD_EMPLOYEE_LIST_ERROR,
    payload,
  };
}
