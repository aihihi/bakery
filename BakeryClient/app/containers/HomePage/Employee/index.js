/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
import {
} from 'containers/App/selectors';
import messages from '../messages';
import {  } from './selectors';
import { saveEmployeeRequest, loadEmployeeListRequest } from './actions';
import EmployeeInput from './EmployeeInput';
/* eslint-disable react/prefer-stateless-function */
export class Employee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        fullName: '',
        mobilePhone: '',
        address: '',
        birthday: '',
        joinedDate: '',
        note: '',
      },
    };
  }
  componentDidMount() {

  }


  handleFormChange = (values) => this.setState({ values })

  handleFormSubmit = () => {
    this.props.saveData(this.state.values);
  }

  render() {

    return (
      <EmployeeInput
        initialValues={this.state.values}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
        disabled={false}
        busy={false}
      />
    );
  }
}

Employee.propTypes = {
  saveData: PropTypes.func,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

  saveData: bindActionCreators(saveEmployeeRequest, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Employee);
