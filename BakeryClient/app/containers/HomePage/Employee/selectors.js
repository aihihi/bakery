/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectEmployeeList = () =>
  createSelector(selectHome, homeState => homeState.get('employeeList'));

export { selectHome, makeSelectEmployeeList };
