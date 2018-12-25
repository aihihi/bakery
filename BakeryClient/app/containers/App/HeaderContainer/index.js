
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import Header from 'components/Header';
// import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';

// import {
// } from 'containers/App/selectors';
// import messages from '../messages';
import { selectIsLoggedIn } from '../selectors';
import { logout } from '../actions';

/* eslint-disable react/prefer-stateless-function */
class HeaderContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header
          logout={this.props.actions.logout}
          auth={this.props.isLoggedIn}
          goToLoginPage={() => { this.props.history.push('/login');}}
        />
      </React.Fragment>
    );
  }
}

HeaderContainer.propTypes = {
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => ({actions:
    bindActionCreators({ logout },
      dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  // withReducer,
  // withSaga,
  withConnect,
  withRouter,
)(HeaderContainer);
