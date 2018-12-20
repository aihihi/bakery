import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import qs from 'qs';

import LoginForm from './LoginForm';

// import {
//   selectIsLoggingIn,
//   selectLoginError,
// } from 'containers/App/selectors';
import { loginWithUsernamePassword } from 'containers/App/actions/authActions';

// import messages from '../../messages';

// const generateResetURL = (email) => email ? `/forgot-password?email=${email}` : '/forgot-password';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        email: '',
      },
    };
  }

  handleFormChange = (values) => this.setState({ values })

  handleFormSubmit = (loginFormValues) => {
    const { login } = this.props;
    login(loginFormValues.email, loginFormValues.password);
  }

  render() {
    const { values } = this.state;
    const { isLoggingIn, errorMessage } = this.props;

    return (
      <div>
        {errorMessage && <h3>errorMessage /></h3>}
        <LoginForm
          initialValues={values}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          disabled={false}
          busy={false}
          // disabled={isLoggingIn}
          // busy={isLoggingIn}
        />
      </div>
    );
  }
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggingIn: selectIsLoggingIn(state),
  errorMessage: selectLoginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(loginWithUsernamePassword, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect
)(LoginScreen);
