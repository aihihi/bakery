/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter, Link } from 'react-router-dom';


// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
import {
} from 'containers/App/selectors';
// import messages from '../messages';
import { makeSelectEmployeeList } from './selectors';
import { saveEmployeeRequest, loadEmployeeListRequest } from './actions';
import EmployeeInput from './EmployeeInput';
import EmployeeList from './EmployeeList';
import Button from '@material-ui/core/es/Button/Button';

/* eslint-disable react/prefer-stateless-function */
export class Employee extends React.Component {
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
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            // path="/employee/list"
            exact
            render={(routeProps) => (
              <EmployeeList {...routeProps} data={this.props.employeeList} />
            )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            exact
            render={(routeProps) => (
              <EmployeeList {...routeProps} data={this.props.employeeList} />
            )}
          />
          <Route
            path={`${this.props.match.url}/add-new`}
            exact
            render={(props) => (
              <EmployeeInput
                initialValues={this.state.values}
                onSubmit={this.handleFormSubmit}
                onChange={this.handleFormChange}
                disabled={false}
                busy={false}
            />
            )}
          />
          <Route
            path={`${this.props.match.url}/:id`}
            exact
            render={(props) => (
              <EmployeeInput
                initialValues={this.state.values}
                onSubmit={this.handleFormSubmit}
                onChange={this.handleFormChange}
                disabled={false}
                busy={false}
          />
          )}
        />
        </Switch>
      </div>

    );
  }
}

Employee.propTypes = {
  actions: PropTypes.object,
  employeeList: PropTypes.array,
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
  withRouter,
)(Employee);
