/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  SAVE_EMPLOYEE_SUCCESS,
  SAVE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  LOAD_EMPLOYEE_LIST_SUCCESS,
  LOAD_EMPLOYEE_LIST_ERROR,
  LOAD_EMPLOYEE_PER_ID_SUCCESS,
  LOAD_EMPLOYEE_PER_ID_ERROR,
  RESET_EMPLOYEE_SUCCESS,
  SET_CURRENT_EMPLOYEE,
  LOAD_EMPLOYEE_PER_STORE_SUCCESS,
  LOAD_EMPLOYEE_PER_STORE_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  currentEmployee: null,
  employeeList: [],
  requestError: null,
  requestSuccess: null,
  employeesPerStore: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_EMPLOYEE_SUCCESS:
    case UPDATE_EMPLOYEE_SUCCESS:
      return state
        .set('currentEmployee', action.payload)
        .set('requestError', null)
        .set('requestSuccess', true);
    case SAVE_EMPLOYEE_ERROR:
    case UPDATE_EMPLOYEE_ERROR:
    case DELETE_EMPLOYEE_ERROR:
    case LOAD_EMPLOYEE_PER_ID_ERROR:
    case LOAD_EMPLOYEE_LIST_ERROR:
      return state
        .set('requestSuccess', null)
        .set('requestError', action.payload);
    case DELETE_EMPLOYEE_SUCCESS:
      return state
        .set('requestError', null)
        .set('requestSuccess', true)
        .set('currentEmployee', null);
    case LOAD_EMPLOYEE_LIST_SUCCESS:
      return state
        .set('employeeList', action.payload)
        .set('requestError', null);
    case LOAD_EMPLOYEE_PER_ID_SUCCESS:
      return state
        .set('currentEmployee', action.payload)
        .set('requestError', null);
    case RESET_EMPLOYEE_SUCCESS:
      return state.set('requestSuccess', null);
    case SET_CURRENT_EMPLOYEE:
      return state.set('currentEmployee', action.payload);
    case LOAD_EMPLOYEE_PER_STORE_SUCCESS:
      return state.set('employeePerStore', action.payload);
    case LOAD_EMPLOYEE_PER_STORE_ERROR:
      return state.set('employeePerStore', action.payload);
    default:
      return state;
  }
}

export default homeReducer;
