import {
  SAVE_EMPLOYEE_REQUEST,
  SAVE_EMPLOYEE_SUCCESS,
  SAVE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  LOAD_EMPLOYEE_LIST_REQUEST,
  LOAD_EMPLOYEE_LIST_SUCCESS,
  LOAD_EMPLOYEE_LIST_ERROR,
  LOAD_EMPLOYEE_PER_ID_REQUEST,
  LOAD_EMPLOYEE_PER_ID_SUCCESS,
  LOAD_EMPLOYEE_PER_ID_ERROR,
  LOAD_EMPLOYEE_PER_STORE_REQUEST,
  LOAD_EMPLOYEE_PER_STORE_SUCCESS,
  LOAD_EMPLOYEE_PER_STORE_ERROR,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  RESET_EMPLOYEE_SUCCESS,
  SET_CURRENT_EMPLOYEE,
  SET_EMPLOYEES_WORKING_FOR,
  SET_EMPLOYEES_PER_STORE,
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
export function deleteEmployeeRequest(payload) {
  return {
    type: DELETE_EMPLOYEE_REQUEST,
    payload,
  };
}
export function deleteEmployeeSuccess(payload) {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload,
  };
}
export function deleteEmployeeFailure(payload) {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    payload,
  };
}
export function updateEmployeeRequest(payload) {
  return {
    type: UPDATE_EMPLOYEE_REQUEST,
    payload,
  };
}
export function updateEmployeeSuccess(payload) {
  return {
    type: UPDATE_EMPLOYEE_SUCCESS,
    payload,
  };
}
export function updateEmployeeFailure(payload) {
  return {
    type: UPDATE_EMPLOYEE_ERROR,
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
export function loadEmployeePerIdRequest(payload) {
  return {
    type: LOAD_EMPLOYEE_PER_ID_REQUEST,
    payload,
  };
}
export function loadEmployeePerIdSuccess(payload) {
  return {
    type: LOAD_EMPLOYEE_PER_ID_SUCCESS,
    payload,
  };
}
export function loadEmployeePerIdFailure(payload) {
  return {
    type: LOAD_EMPLOYEE_PER_ID_ERROR,
    payload,
  };
}

export function resetEmployeeSuccess() {
  return {
    type: RESET_EMPLOYEE_SUCCESS,
  };
}

export function setCurrentEmployee(payload) {
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload,
  };
}
export function setEmployeeWorkingFor(storeId, employeeIds) {
  return {
    type: SET_EMPLOYEES_WORKING_FOR,
    storeId,
    employeeIds,
  };
}
export function setEmployeesPerStore(payload) {
  return {
    type: SET_EMPLOYEES_PER_STORE,
    payload,
  };
}

export function loadEmployeePerStoreRequest(payload) {
  return {
    type: LOAD_EMPLOYEE_PER_STORE_REQUEST,
    payload,
  };
}
export function loadEmployeePerStoreSuccess(payload) {
  return {
    type: LOAD_EMPLOYEE_PER_STORE_SUCCESS,
    payload,
  };
}
export function loadEmployeePerStoreFailure(payload) {
  return {
    type: LOAD_EMPLOYEE_PER_STORE_ERROR,
    payload,
  };
}
