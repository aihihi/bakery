import { fromJS } from 'immutable';

import {
  SAVE_STORE_SUCCESS,
  SAVE_STORE_ERROR,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_ERROR,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_ERROR,
  LOAD_STORE_LIST_SUCCESS,
  LOAD_STORE_LIST_ERROR,
  LOAD_STORE_PER_ID_SUCCESS,
  LOAD_STORE_PER_ID_ERROR,
  RESET_STORE_SUCCESS,
  SET_CURRENT_STORE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  currentStore: null,
  storeList: [],
  requestError: null,
  requestSuccess: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_STORE_SUCCESS:
    case UPDATE_STORE_SUCCESS:
      return state
        .set('currentStore', action.payload)
        .set('requestError', null)
        .set('requestSuccess', true);
    case SAVE_STORE_ERROR:
    case UPDATE_STORE_ERROR:
    case DELETE_STORE_ERROR:
    case LOAD_STORE_PER_ID_ERROR:
    case LOAD_STORE_LIST_ERROR:
      return state
        .set('requestSuccess', null)
        .set('requestError', action.payload);
    case DELETE_STORE_SUCCESS:
      return state
        .set('requestError', null)
        .set('requestSuccess', true)
        .set('currentStore', null);
    case LOAD_STORE_LIST_SUCCESS:
      return state
        .set('storeList', action.payload)
        .set('requestError', null);
    case LOAD_STORE_PER_ID_SUCCESS:
      return state
        .set('currentStore', action.payload)
        .set('requestError', null);
    case RESET_STORE_SUCCESS:
      return state.set('requestSuccess', null);
    case SET_CURRENT_STORE:
      return state.set('currentStore', action.payload);
    default:
      return state;
  }
}

export default homeReducer;
