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
import { makeSelectEmployeeList } from './selectors';
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
    this.props.actions.loadEmployeeListRequest();
  }


  handleFormChange = (values) => this.setState({ values })

  handleFormSubmit = () => {
    this.props.actions.saveEmployeeRequest(this.state.values);
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
  actions: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  employeeList: makeSelectEmployeeList(),

});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ saveEmployeeRequest,
    loadEmployeeListRequest }, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Employee);
