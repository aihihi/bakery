
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('store', initialState);

const makeSelectStoreList = () =>
  createSelector(selectHome, homeState => homeState.get('storeList'));

const makeSelectStorePerId = () =>
  createSelector(selectHome, homeState => homeState.get('currentStore'));

const makeSelectCurrentStore = () =>
  createSelector(selectHome, homeState => homeState.get('currentStore'));

const makeSelectRequestError = () =>
  createSelector(selectHome, homeState => homeState.get('requestError'));

const makeSelectRequestSuccess = () =>
  createSelector(selectHome, homeState => homeState.get('requestSuccess'));

export {
  selectHome,
  makeSelectStoreList,
  makeSelectStorePerId,
  makeSelectCurrentStore,
  makeSelectRequestError,
  makeSelectRequestSuccess,
};
