/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectAuth = state => state.get('global');

const selectRouter = state => state.get('router');

// const makeSelectCurrentUser = () =>
//   createSelector(selectGlobal, globalState => globalState.get('currentUser'));
//
// const makeSelectLoading = () =>
//   createSelector(selectGlobal, globalState => globalState.get('loading'));
//
// const makeSelectError = () =>
//   createSelector(selectGlobal, globalState => globalState.get('error'));

// const makeSelectRepos = () =>
//   createSelector(selectGlobal, globalState =>
//     globalState.getIn(['userData', 'repositories']),
//   );

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

/* Auth */
export const selectAuthUserInfo = (state) => selectAuth(state)
  .get('userInfo');

export const selectAuthIdToken = (state) => selectAuth(state)
  .get('idToken');

export const selectAuthAccessToken = (state) => selectAuth(state)
  .get('accessToken');

export const selectIsLoggedIn = (state) => selectAuth(state)
  .get('isLoggedIn');

export const selectIsLoggingIn = (state) => selectAuth(state)
  .get('isLoggingIn');

export const selectLoginError = (state) => selectAuth(state)
  .get('loginError');

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
