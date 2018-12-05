/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_USERNAME,
  SAVE_EMPLOYEE_REQUEST,
  SAVE_EMPLOYEE_SUCCESS,
  SAVE_EMPLOYEE_ERROR,
  LOAD_EMPLOYEE_LIST_REQUEST,
  LOAD_EMPLOYEE_LIST_SUCCESS,
  LOAD_EMPLOYEE_LIST_ERROR } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}
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
