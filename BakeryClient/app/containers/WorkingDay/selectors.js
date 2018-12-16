
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('workingDay', initialState);

const makeSelectWorkingDayList = () =>
  createSelector(selectHome, homeState => homeState.get('workingDayList'));

const makeSelectWorkingDayPerId = () =>
  createSelector(selectHome, homeState => homeState.get('currentWorkingDay'));

const makeSelectCurrentWorkingDay = () =>
  createSelector(selectHome, homeState => homeState.get('currentWorkingDay'));

const makeSelectRequestError = () =>
  createSelector(selectHome, homeState => homeState.get('requestError'));

const makeSelectRequestSuccess = () =>
  createSelector(selectHome, homeState => homeState.get('requestSuccess'));

export {
  selectHome,
  makeSelectWorkingDayList,
  makeSelectWorkingDayPerId,
  makeSelectCurrentWorkingDay,
  makeSelectRequestError,
  makeSelectRequestSuccess,
};
