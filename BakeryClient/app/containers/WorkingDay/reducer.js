import { fromJS } from 'immutable';

import {
  SAVE_WORKING_DAY_SUCCESS,
  SAVE_WORKING_DAY_ERROR,
  UPDATE_WORKING_DAY_SUCCESS,
  UPDATE_WORKING_DAY_ERROR,
  DELETE_WORKING_DAY_SUCCESS,
  DELETE_WORKING_DAY_ERROR,
  LOAD_WORKING_DAY_LIST_SUCCESS,
  LOAD_WORKING_DAY_LIST_ERROR,
  LOAD_WORKING_DAY_PER_ID_SUCCESS,
  LOAD_WORKING_DAY_PER_ID_ERROR,
  RESET_WORKING_DAY_SUCCESS,
  SET_CURRENT_WORKING_DAY,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  currentWorkingDay: null,
  workingDayList: [],
  requestError: null,
  requestSuccess: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_WORKING_DAY_SUCCESS:
    case UPDATE_WORKING_DAY_SUCCESS:
      return state
        .set('currentWorkingDay', action.payload)
        .set('requestError', null)
        .set('requestSuccess', true);
    case SAVE_WORKING_DAY_ERROR:
    case UPDATE_WORKING_DAY_ERROR:
    case DELETE_WORKING_DAY_ERROR:
    case LOAD_WORKING_DAY_PER_ID_ERROR:
    case LOAD_WORKING_DAY_LIST_ERROR:
      return state
        .set('requestSuccess', null)
        .set('requestError', action.payload);
    case DELETE_WORKING_DAY_SUCCESS:
      return state
        .set('requestError', null)
        .set('requestSuccess', true)
        .set('currentWorkingDay', null);
    case LOAD_WORKING_DAY_LIST_SUCCESS:
      return state
        .set('workingDayList', action.payload)
        .set('requestError', null);
    case LOAD_WORKING_DAY_PER_ID_SUCCESS:
      return state
        .set('currentWorkingDay', action.payload)
        .set('requestError', null);
    case RESET_WORKING_DAY_SUCCESS:
      return state.set('requestSuccess', null);
    case SET_CURRENT_WORKING_DAY:
      return state.set('currentWorkingDay', action.payload);
    default:
      return state;
  }
}

export default homeReducer;
