/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('employee', initialState);

const makeSelectEmployeeList = () =>
  createSelector(selectHome, homeState => homeState.get('employeeList'));

const makeSelectEmployeePerId = () =>
  createSelector(selectHome, homeState => homeState.get('currentEmployee'));

const makeSelectCurrentEmployee = () =>
  createSelector(selectHome, homeState => homeState.get('currentEmployee'));

const makeSelectRequestError = () =>
  createSelector(selectHome, homeState => homeState.get('requestError'));

const makeSelectRequestSuccess = () =>
  createSelector(selectHome, homeState => homeState.get('requestSuccess'));

export {
  selectHome,
  makeSelectEmployeeList,
  makeSelectEmployeePerId,
  makeSelectCurrentEmployee,
  makeSelectRequestError,
  makeSelectRequestSuccess,
};
