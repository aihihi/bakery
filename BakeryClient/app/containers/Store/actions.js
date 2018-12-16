import {
  SAVE_STORE_REQUEST,
  SAVE_STORE_SUCCESS,
  SAVE_STORE_ERROR,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_ERROR,
  LOAD_STORE_LIST_REQUEST,
  LOAD_STORE_LIST_SUCCESS,
  LOAD_STORE_LIST_ERROR,
  LOAD_STORE_PER_ID_REQUEST,
  LOAD_STORE_PER_ID_SUCCESS,
  LOAD_STORE_PER_ID_ERROR,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_ERROR,
  RESET_STORE_SUCCESS,
  SET_CURRENT_STORE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function saveStoreRequest(payload) {
  return {
    type: SAVE_STORE_REQUEST,
    payload,
  };
}
export function saveStoreSuccess(payload) {
  return {
    type: SAVE_STORE_SUCCESS,
    payload,
  };
}
export function saveStoreFailure(payload) {
  return {
    type: SAVE_STORE_ERROR,
    payload,
  };
}
export function deleteStoreRequest(payload) {
  return {
    type: DELETE_STORE_REQUEST,
    payload,
  };
}
export function deleteStoreSuccess(payload) {
  return {
    type: DELETE_STORE_SUCCESS,
    payload,
  };
}
export function deleteStoreFailure(payload) {
  return {
    type: DELETE_STORE_ERROR,
    payload,
  };
}
export function updateStoreRequest(payload) {
  return {
    type: UPDATE_STORE_REQUEST,
    payload,
  };
}
export function updateStoreSuccess(payload) {
  return {
    type: UPDATE_STORE_SUCCESS,
    payload,
  };
}
export function updateStoreFailure(payload) {
  return {
    type: UPDATE_STORE_ERROR,
    payload,
  };
}
export function loadStoreListRequest(payload) {
  return {
    type: LOAD_STORE_LIST_REQUEST,
    payload,
  };
}
export function loadStoreListSuccess(payload) {
  return {
    type: LOAD_STORE_LIST_SUCCESS,
    payload,
  };
}
export function loadStoreListFailure(payload) {
  return {
    type: LOAD_STORE_LIST_ERROR,
    payload,
  };
}
export function loadStorePerIdRequest(payload) {
  return {
    type: LOAD_STORE_PER_ID_REQUEST,
    payload,
  };
}
export function loadStorePerIdSuccess(payload) {
  return {
    type: LOAD_STORE_PER_ID_SUCCESS,
    payload,
  };
}
export function loadStorePerIdFailure(payload) {
  return {
    type: LOAD_STORE_PER_ID_ERROR,
    payload,
  };
}

export function resetStoreSuccess() {
  return {
    type: RESET_STORE_SUCCESS,
  };
}

export function setCurrentStore(payload) {
  return {
    type: SET_CURRENT_STORE,
    payload,
  };
}
