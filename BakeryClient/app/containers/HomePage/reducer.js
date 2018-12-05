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

import { CHANGE_USERNAME,
  SAVE_EMPLOYEE_SUCCESS,
  SAVE_EMPLOYEE_ERROR,
  LOAD_EMPLOYEE_LIST_SUCCESS,
  LOAD_EMPLOYEE_LIST_ERROR} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  currentEmployee: null,
  employeeList: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    case SAVE_EMPLOYEE_SUCCESS:
      return state.set('currentEmployee', action.payload);
    case LOAD_EMPLOYEE_LIST_SUCCESS:
      return state.set('employeeList', action.payload);
    default:
      return state;
  }
}

export default homeReducer;
